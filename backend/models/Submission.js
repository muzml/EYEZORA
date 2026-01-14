const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  examId: String,
  studentId: String,
  answers: [Number],
  submittedAt: Date
});

module.exports = mongoose.model("Submission", submissionSchema);
