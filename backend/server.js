const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const upload = multer({ dest: uploadDir });

// POST /api/complaints — receive complaint text + image, call ML service
app.post("/api/complaints", upload.single("image"), async (req, res) => {
    const complaintText = req.body.text;
    const imagePath = req.file?.path;

    if (!complaintText || !imagePath) {
        return res.status(400).json({ error: "Complaint text and image are required." });
    }

    try {
        // Forward image path to the Python ML service
        const mlResponse = await axios.post("http://localhost:8000/predict", {
            image_path: imagePath
        });

        const authenticity = mlResponse.data.result; // "Real" or "AI-generated"

        // Optionally save to DB here (e.g., MongoDB)

        res.json({
            message: "Complaint submitted successfully",
            authenticity: authenticity,
            complaint: complaintText
        });
    } catch (err) {
        console.error("ML service error:", err.message);
        // Fallback if ML service is not running — still accept the complaint
        res.json({
            message: "Complaint submitted (image verification unavailable)",
            authenticity: "Unknown",
            complaint: complaintText
        });
    }
});

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
