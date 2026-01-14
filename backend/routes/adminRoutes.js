const express = require("express");
const router = express.Router();
const {
  createExam,
  addQuestion,
} = require("../controllers/adminController");

// Create exam
router.post("/exam", createExam);

// Add question to exam
router.post("/question", addQuestion);

module.exports = router;
