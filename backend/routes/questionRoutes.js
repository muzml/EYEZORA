const express = require("express");
const router = express.Router();

const { addQuestion } = require("../controllers/adminController");
// ✅ THIS IMPORT IS REQUIRED

// ADD QUESTION
router.post("/", addQuestion);

module.exports = router;
