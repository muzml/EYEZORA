from ultralytics import YOLO
import cv2
import os

# Load your trained model
model = YOLO("best.pt")

# Path to test images folder
test_dir = "test_images"

# Valid image extensions
valid_exts = [".jpg", ".jpeg", ".png", ".bmp", ".webp"]

# Loop through each image in the test folder
for img_name in os.listdir(test_dir):
    if not any(img_name.lower().endswith(ext) for ext in valid_exts):
        continue  # Skip non-image files like desktop.ini

    img_path = os.path.join(test_dir, img_name)

    # Run inference
    results = model(img_path, save=True, show=True)

    # Optional: display using OpenCV
    for result in results:
        annotated = result.plot()
        cv2.imshow("Result", annotated)
        cv2.waitKey(0)

cv2.destroyAllWindows()
