from database.db import violations_collection
from datetime import datetime

def log_event(student_id: str, exam_id: str, reason: str):
    violations_collection.insert_one({
        "student_id": student_id,
        "exam_id": exam_id,
        "reason": reason,
        "timestamp": datetime.utcnow()
    })

    print(f"[VIOLATION SAVED] {student_id} → {reason}")
