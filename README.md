# EyeZora 👁️

EyeZora is a state-of-the-art AI-powered smart online examination proctoring system. It monitors candidate behavior in real-time using modern deep learning models and computer vision techniques, alerting administrators to potential academic dishonesty.

## Key Features

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
   - Windows (PowerShell):
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - macOS / Linux / Windows CMD:
     ```bash
     source venv/bin/activate  # or venv\Scripts\activate
     ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
### 4. Next.js Frontend Setup
1. Change directory to the frontend:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🏃 Running the Application

### The Easy Way (Windows Powershell)

Launch all services (Express, FastAPI, Next.js) in separate windows using:
```powershell
./start-all.ps1
```

### The Manual Way (All OS)

Run the services individually:

1. **Express Backend** (Port 5000):
   ```bash
   cd backend && npm run dev
   ```

2. **AI Proctoring Backend** (Port 8000):
   ```bash
   cd backend && uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```

3. **Next.js Frontend** (Port 3000):
   ```bash
   cd frontend && npm run dev
   ```

---

## 🧠 AI Proctoring Logic Details

The AI backend processes frame-by-frame webcam feeds using computer vision algorithms:

- **Face Presence Monitoring**:
  - Automatically loads the YOLOv8 face detector (`best_train.pt`).
  - If no face is detected in the frame, a warning event `No Face Detected` (Medium Severity) is generated.
  - If multiple faces are detected, a warning event `Multiple Faces Detected` (High Severity) is generated.

- **Active Gaze Estimation**:
  - Isolates the face bounding boxes.
  - Detects eye regions using OpenCV Haar Cascade Classifier (`haarcascade_eye.xml`).
  - Estimates pupil centroid movement (Center, Left, Right).
  - Uses a rolling buffer (size 5). If the candidate looks away from the screen consistently, it generates a `Gaze Away` (Low/Medium Severity) event.

- **Object Detection (Cell Phones/Books)**:
  - Uses the COCO-trained `yolov8s.pt` model to scan for target objects.
  - Generates alerts if objects like `cell phone`, `book`, or laptop screens are found in the frame.

---

## 🤝 Contribution Guidelines

We welcome contributions to EyeZora! If you want to make improvements or add features:

1. Fork the Repository.
2. Create a Feature Branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the Branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it in accordance with the license terms.

---

*EyeZora - Empowering Secure and Fair Online Assessments.*
