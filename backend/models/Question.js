const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  questionText: String,
  options: [String],
  correctOptionIndex: Number,
});

module.exports = mongoose.model("Question", questionSchema);
