const Exam = require("../models/Exam");
const Question = require("../models/Question");

/* ================= CREATE EXAM ================= */
exports.createExam = async (req, res) => {
  try {
    const { title, duration } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Exam title required" });
    }

    const exam = await Exam.create({
      title,
      duration: duration || 60,
    });

    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= ADD QUESTION ================= */
exports.addQuestion = async (req, res) => {
  try {
    const { examId, questionText, options, correctOptionIndex } = req.body;

    const question = await Question.create({
      examId,
      questionText,
      options,
      correctOptionIndex,
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
