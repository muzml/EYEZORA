const express = require("express");
const router = express.Router();

const {
  createExam,
  addQuestion, // ✅ MUST MATCH controller export
} = require("../controllers/adminController");

router.post("/exam", createExam);
router.post("/question", addQuestion);

module.exports = router;
