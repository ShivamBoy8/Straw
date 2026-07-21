const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addToCart, updateCartQuantity, removeCartItem, clearCart, getCart } = require("../controllers/cartController");
const router = express.Router();


router.post("/add", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.patch("/update/:id", authMiddleware, updateCartQuantity);

router.delete("/remove/:id", authMiddleware, removeCartItem);

router.delete("/clear", authMiddleware, clearCart);

module.exports = router;