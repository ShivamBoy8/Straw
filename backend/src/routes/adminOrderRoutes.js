const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

router.get("/", authMiddleware, adminMiddleware, getAllOrders);

router.get("/:id", authMiddleware, adminMiddleware, getAdminOrderById);

router.patch("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
