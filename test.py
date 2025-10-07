from ultralytics import YOLO
import cv2
from sound_alert import play_alert  # import from your sound file

# Load YOLO model (your trained face model)
model = YOLO("best.pt")

# Open webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLO detection
    results = model(frame, stream=True)
    face_count = 0  # count faces

    # Count faces
    for r in results:
        for box in r.boxes:
            cls = int(box.cls[0])
            label = model.names[cls].lower()

            if "face" in label:  # detect faces (not "person")
                face_count += 1
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                cv2.putText(frame, "Face", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    # Display face count
    cv2.putText(frame, f"Faces: {face_count}", (20, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 255), 3)

    # Play buzzer when 2 or more faces detected
    if face_count >= 2:
        print("🔔 Buzzer should sound now!")  # debug check
        play_alert()

    # Show webcam feed
    cv2.imshow("Webcam - Face Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
