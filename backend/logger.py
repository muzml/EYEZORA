import datetime

LOG_FILE = "events.log"

def log_event(student_id, event_type, severity="HIGH"):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    message = f"[{timestamp}] [{severity}] Student:{student_id} - {event_type}"

    with open(LOG_FILE, "a") as f:
        f.write(message + "\n")

    print(message)
