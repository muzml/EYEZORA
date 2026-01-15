const express = require("express");
const router = express.Router();
const { getExamQuestions } = require("../controllers/studentController");

// ✅ THIS IS THE ROUTE YOUR FRONTEND IS CALLING
router.get("/exam/:examId", getExamQuestions);

module.exports = router;
