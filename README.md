# EyeZora 👁️🔍

EyeZora is a state-of-the-art AI-powered smart online examination proctoring system. It monitors candidate behavior in real-time using modern deep learning models and computer vision techniques, alerting administrators to potential academic dishonesty.

## 🚀 Key Features

- **Real-Time Video Analytics**: Direct camera feed processing for immediate feedback.
- **YOLO-Based Face Detection**: Tracks the presence of the examinee and detects if multiple faces or no faces are visible.
- **Active Gaze Tracking**: Uses OpenCV Haar Cascades and pupil centroid estimation to detect when the candidate looks away from the screen.
- **Object & Device Detection**: Leverages YOLOv8 models to identify unauthorized devices (e.g., mobile phones, tablets) or books in the frame.
- **Comprehensive Admin Dashboard**: Monitors live metrics, reviews violation logs, and manages students/exams.
- **Express + FastAPI Architecture**: Decoupled systems for high-performance API routing and heavy AI model inference.
- **Automated Logging**: Captures session details and exam logs stored systematically for admin download.

---

## 🏗️ System Architecture

The application is split into three main components, each optimized for its specific workload:
1. **Next.js Frontend (Port 3000)**:
   - Built using Next.js with TypeScript.
   - Features a clean, modern user interface for both students (taking exams with live proctoring) and admins (dashboard for statistics, log checks, and configuration).
2. **Node.js Express Backend (Port 5000)**:
   - Manages database schemas, authentication, exam scheduling, questions, and students session information.
   - Serves static exam logs for admin auditing.
3. **FastAPI AI Backend (Port 8000)**:
   - Built with Python FastAPI for extremely fast asynchronous endpoints.
   - Integrates OpenCV, Haar Cascades, and YOLOv8 neural network inference to process base64 webcam frames and return detection events instantly.

---

## 🛠️ Prerequisites & Installation

To run the entire EyeZora suite, you need to set up both Node.js (for the frontend and Express backend) and Python (for the AI proctoring backend).

### 1. Repository Setup

Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/muzml/EYEZORA.git
cd EYEZORA
```
### 2. Express Backend Setup
1. Change directory to the backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env` (port, db connection, etc.).
### 3. AI Proctoring Backend Setup
1. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```
2. Activate the virtual environment:
