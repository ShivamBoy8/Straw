const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getAddress,
  updateAddress,
 
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile", authMiddleware, getUser);
router.patch("/update",authMiddleware,updateUser);
router.delete("/delete",authMiddleware,deleteUser)

router.get("/address",  authMiddleware, getAddress);
router.patch("/address",  authMiddleware, updateAddress);

module.exports = router;