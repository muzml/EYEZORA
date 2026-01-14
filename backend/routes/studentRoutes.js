const express = require("express");
const router = express.Router();
const {
  getExamQuestions,
  submitExam,
} = require("../controllers/studentController");

// Fetch exam questions
router.get("/exam/:examId", getExamQuestions);

// Submit exam
router.post("/submit", submitExam);

module.exports = router;
