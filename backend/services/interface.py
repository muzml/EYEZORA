def verify_identity(image_base64, student_id):
    # Call trained model here
    prediction = model.predict(image_base64)

    if prediction == "match":
        return { "status": "verified", "confidence": 0.93 }

    if prediction == "no_face":
        return { "status": "violation", "reason": "no_face" }

    if prediction == "multiple_faces":
        return { "status": "violation", "reason": "multiple_faces" }

    return { "status": "violation", "reason": "unknown_person" }
