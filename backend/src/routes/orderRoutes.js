const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, getMyOrders);

router.get("/:id", authMiddleware, getOrderById);

router.patch("/cancel/:id", authMiddleware, cancelOrder);

module.exports = router;