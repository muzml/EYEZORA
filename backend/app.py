from flask import Flask, request, jsonify
from logger import log_event

app = Flask(__name__)

@app.route("/log", methods=["POST"])
def log():
    data = request.json
    log_event(
        student_id=data["student_id"],
        event_type=data["event"]
    )
    return jsonify({"status": "logged"})
from flask import Flask, request, jsonify
from flask_cors import CORS
from logger import log_event

app = Flask(__name__)
CORS(app)  # 🔥 allow frontend requests

@app.route("/log", methods=["POST"])
def log():
    data = request.json
    print("Received:", data)  # DEBUG

    log_event(
        student_id=data["student_id"],
        event_type=data["event"]
    )

    return jsonify({"status": "logged"})

if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(debug=True)
