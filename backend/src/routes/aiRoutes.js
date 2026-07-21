const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { recommendSize } = require("../controllers/aiController");

router.post("/recommend-size", authMiddleware, recommendSize);

module.exports = router;