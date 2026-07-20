const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const createProduct = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5),
  createProduct,
);

module.exports = router;
