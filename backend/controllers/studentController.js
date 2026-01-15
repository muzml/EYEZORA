const mongoose = require("mongoose");
const Question = require("../models/Question");

exports.getExamQuestions = async (req, res) => {
  try {
    const examId = req.params.examId;

    const questions = await Question.find({
      examId: new mongoose.Types.ObjectId(examId),
    }).select("-correctOptionIndex");

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
