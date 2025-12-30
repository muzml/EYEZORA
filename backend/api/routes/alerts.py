from fastapi import APIRouter
from database.db import violations_collection

router = APIRouter()

@router.get("/admin/alerts")
def get_alerts():
    alerts = list(
        violations_collection.find().sort("timestamp", -1).limit(10)
    )

    for a in alerts:
        a["_id"] = str(a["_id"])

    return alerts
