# 🏨 Hostel Management System

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application for managing hostel operations — including student authentication, complaint tracking with AI image verification, and leave management.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-green?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-18+-brightgreen?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Python](https://img.shields.io/badge/Python-3.9+-blue?style=flat-square&logo=python)

---

## 📁 Project Structure

```
HOSTEL-MANAGEMENT-SYSTEM/
├── backend/                  ← Node.js + Express API (Port 5001)
│   ├── config/db.js          ← MongoDB connection
│   ├── models/               ← Mongoose schemas (Student, Complaint, Leave)
│   ├── routes/               ← Auth & Leave routes
│   ├── utils/sendEmail.js    ← Nodemailer email utility
│   ├── uploads/              ← Uploaded complaint images
│   ├── .env                  ← Environment variables (create this!)
│   ├── .env.example          ← Template for .env
│   └── server.js             ← Entry point
│
├── APPLICATION/
│   └── frontend/             ← React + Vite + TypeScript (Port 5173)
│       ├── src/
│       │   ├── components/   ← All React components
│       │   └── index.css     ← Global styles (Vanilla CSS + Glassmorphism)
│       └── vite.config.ts
│
└── ml-model/                 ← Python FastAPI ML service (Port 8000)
    └── service.py            ← ResNet18 AI vs Real image classifier
```

---

## ⚙️ Prerequisites

Make sure you have the following installed on your machine **before starting**:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | Comes with Node.js | — |
| **Git** | Latest | [git-scm.com](https://git-scm.com) |
| **Python** | 3.9 or higher | [python.org](https://python.org) *(optional — only for ML model)* |
| **pip** | Comes with Python | — |

---

## 🚀 Setup & Installation

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Rishi0754eegzvbhxhnh/HOSTEL-MANAGEMENT-SYSTEM.git
cd HOSTEL-MANAGEMENT-SYSTEM
```

---

### Step 2 — Setup the Backend

```bash
# Navigate into backend folder
cd backend

# Install all required Node.js packages
npm install
```

**Packages installed automatically:**
| Package | Purpose |
|---------|---------|
| `express` | Web server / REST API framework |
| `mongoose` | MongoDB ODM — connects to MongoDB Atlas |
| `dotenv` | Loads environment variables from `.env` |
| `bcryptjs` | Hashes and verifies passwords |
| `jsonwebtoken` | Creates JWT tokens for authentication |
| `cors` | Allows frontend to communicate with backend |
| `multer` | Handles image/file uploads |
| `nodemailer` | Sends email notifications to admin |
| `axios` | Makes HTTP calls to the ML model |
| `nodemon` | Auto-restarts server on file changes (dev) |

---

### Step 3 — Create the Backend `.env` File

Inside the `backend/` folder, create a file named `.env`:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
# MongoDB Atlas Connection URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hostelDB?appName=Cluster0

# JWT Secret — generate one by running:
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_jwt_secret_here

# Email Settings (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password   ← Get from myaccount.google.com/apppasswords

# Admin email for notifications
ADMIN_EMAIL=your_admin_email@gmail.com

# Backend port
PORT=5001
```

> **MongoDB Atlas Setup:**
> 1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
> 2. Create a new cluster (free M0 tier)
> 3. Create a database user with read/write access
> 4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
> 5. Click **Connect** → **Connect your application** → copy the URI

> **Gmail App Password:**
> 1. Enable 2-factor authentication on your Google account
> 2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 3. Generate a new App Password for "Mail"
> 4. Paste that 16-character password as `EMAIL_PASS`

---

### Step 4 — Setup the Frontend

Open a **new terminal** in the project root:

```bash
# Navigate to the frontend folder
cd APPLICATION/frontend

# Install all required Node.js packages
npm install
```

**Packages installed automatically:**
| Package | Purpose |
|---------|---------|
| `react` | Core React library |
| `react-dom` | Renders React to the browser |
| `react-router-dom` | Client-side page routing |
| `axios` | Makes API calls to the backend |
| `vite` | Dev server and build tool |
| `typescript` | TypeScript support for `.tsx` files |
| `@vitejs/plugin-react` | Vite plugin to compile React JSX/TSX |

---

### Step 5 — (Optional) Setup the ML Model

The ML model detects whether complaint images are **AI-generated or Real**. The app works without it — complaints just show `"Unknown"` for authenticity.

```bash
# Navigate to the ml-model folder
cd ml-model

# Install Python dependencies
pip install fastapi uvicorn torch torchvision pillow
```

> ⚠️ `torch` is a large download (~800MB). Ensure stable internet and enough disk space.

---

## ▶️ Running the Application

You need **2 terminals** (or 3 if using the ML model). Run each in a separate terminal window:

### Terminal 1 — Start the Backend
```bash
cd backend
npm run dev
```
✅ Expected: `Backend running on http://localhost:5001` + `MongoDB Connected`

---

### Terminal 2 — Start the Frontend
```bash
cd APPLICATION/frontend
npm run dev
```
✅ Expected: `Local: http://localhost:5173/`

Then open your browser at: **http://localhost:5173**

---

### Terminal 3 — Start the ML Model (Optional)
```bash
cd ml-model
uvicorn service:app --host 0.0.0.0 --port 8000 --reload
```
✅ Expected: `Uvicorn running on http://0.0.0.0:8000`

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@hostel.com` | `admin123` |
| **Student** | `student@hostel.com` | `student123` |

> If login fails, the database might be empty. Contact the project owner for seed data.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new student |
| `POST` | `/api/auth/login` | Login (student or admin) |
| `POST` | `/api/complaints` | Submit a complaint with image |
| `POST` | `/api/leave` | Submit a leave request |
| `GET` | `/health` | Backend health check |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite, React Router DOM |
| **Styling** | Vanilla CSS, Glassmorphism |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (via Mongoose) |
| **Auth** | JWT (JSON Web Tokens) + bcryptjs |
| **File Uploads** | Multer |
| **Email** | Nodemailer (Gmail SMTP) |
| **ML Model** | Python, FastAPI, PyTorch (ResNet18), Pillow |

---

## 🚨 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| `Cannot connect to MongoDB` | Check `MONGO_URI` in `.env`. Whitelist your IP in Atlas. |
| `Port 5001 already in use` | Run `netstat -ano \| findstr :5001` then `taskkill /PID <id> /F` |
| `Port 5173 already in use` | Run `netstat -ano \| findstr :5173` then `taskkill /PID <id> /F` |
| `npm install` errors | Delete `node_modules/` and `package-lock.json`, then retry |
| Login not working | Database may be empty — seed the DB with default users |
| ML model errors | Ignore — backend handles ML being offline gracefully |
| Email not sending | Set a valid Gmail App Password in `.env` |

---

## 📜 License

This project is for educational purposes.

---

## 👤 Author

**Rishi Kumar**  
GitHub: [@Rishi0754eegzvbhxhnh](https://github.com/Rishi0754eegzvbhxhnh)
