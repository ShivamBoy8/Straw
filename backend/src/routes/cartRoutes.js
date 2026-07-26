const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addToCart, updateCartQuantity, removeCartItem, clearCart, getCart } = require("../controllers/cartController");
const router = express.Router();


router.post("/add", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.patch("/items/:itemId", authMiddleware, updateCartQuantity);
router.delete("/items/:itemId", authMiddleware, removeCartItem);

router.delete("/clear", authMiddleware, clearCart);

module.exports = router;