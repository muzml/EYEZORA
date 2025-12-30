from fastapi import APIRouter
from services.event_logger import log_event

router = APIRouter()

@router.post("/verify-person")
def verify_person(payload: dict):
    student_id = payload.get("student_id")
    exam_id = payload.get("exam_id")
    ai_result = payload.get("ai_result")

    if ai_result == "MATCH":
        return {"status": "ok"}

    elif ai_result == "MULTIPLE_FACES":
        log_event(student_id, exam_id, "multiple_faces")
        return {"status": "violation", "reason": "multiple_faces"}

    elif ai_result == "NO_FACE":
        log_event(student_id, exam_id, "no_face")
        return {"status": "violation", "reason": "no_face"}

    elif ai_result == "UNKNOWN":
        log_event(student_id, exam_id, "unknown_person")
        return {"status": "violation", "reason": "unknown_person"}

    return {"status": "error"}
