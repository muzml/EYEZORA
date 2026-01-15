const Exam = require("../models/Exam");
const Question = require("../models/Question");

exports.createExam = async (req, res) => {
  const exam = await Exam.create({ title: req.body.title });
  res.status(201).json(exam);
};

exports.addQuestion = async (req, res) => {
  const { examId, questionText, options, correctOptionIndex } = req.body;

  if (!examId) {
    return res.status(400).json({ error: "examId is required" });
  }

  const question = await Question.create({
    examId,
    questionText,
    options,
    correctOptionIndex,
  });

  res.status(201).json(question);
};
