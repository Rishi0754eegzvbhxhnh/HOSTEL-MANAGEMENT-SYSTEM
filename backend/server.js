require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");
const Complaint = require("./models/Complaint");
const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const sendEmail = require("./utils/sendEmail");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const upload = multer({ dest: uploadDir });

// POST /api/complaints — receive complaint text + image, call ML service, save to DB, and notify admin
app.post("/api/complaints", upload.single("image"), async (req, res) => {
    const complaintText = req.body.text;
    const imagePath = req.file?.path;

    if (!complaintText || !imagePath) {
        return res.status(400).json({ error: "Complaint text and image are required." });
    }

    let authenticity = "Unknown";
    
    try {
        const mlResponse = await axios.post("http://localhost:8000/predict", {
            image_path: imagePath
        });
        authenticity = mlResponse.data.result;
    } catch (err) {
        console.error("ML service error or unavailable:", err.message);
    }

    try {
        const newComplaint = new Complaint({
            complaintText: complaintText,
            imagePath: imagePath,
            authenticity: authenticity
        });
        const savedComplaint = await newComplaint.save();

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendEmail({
                email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
                subject: 'New Complaint Submitted - HostelPro',
                message: `Complaint: ${complaintText}\nAuthenticity: ${authenticity}`
            });
        }

        res.json({
            message: "Complaint submitted and saved successfully",
            authenticity: authenticity,
            complaint: savedComplaint
        });
    } catch (dbErr) {
        console.error("Database save error:", dbErr.message);
        res.status(500).json({ error: "Failed to save complaint to database" });
    }
});

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
