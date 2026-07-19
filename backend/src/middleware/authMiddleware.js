const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");
const redisClient = require("../config/redis");

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    const isBlocked = await redisClient.exists(`token:${token}`);

    if (isBlocked)
      return res.status(401).json({
        success: false,
        message: "Token has been revoked",
      });

    const payload = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(payload.userId).select("-password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = authMiddleware;
