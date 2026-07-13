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
