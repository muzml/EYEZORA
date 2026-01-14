const Question = require("../models/Question");
const Submission = require("../models/Submission");

/* ================= FETCH QUESTIONS ================= */
exports.getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;

    const questions = await Question.find(
      { examId },
      { correctOptionIndex: 0 } // hide answers
    );

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= SUBMIT EXAM ================= */
exports.submitExam = async (req, res) => {
  try {
    const { examId, studentId, answers } = req.body;

    const submission = await Submission.create({
      examId,
      studentId,
      answers,
    });

    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
