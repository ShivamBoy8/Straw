const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.get("/", authMiddleware, adminMiddleware, getAllOrders);

router.patch("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
