const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../utils/generateToken");
const validateUser = require("../validators/authValidator");
const redisClient = require("../config/redis");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    validateUser(req.body);

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateTokenAndSetCookie(res, user._id);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    const payload = jwt.decode(token);

    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.cookie("token", null, { expires: new Date(Date.now()) });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  return res.status(200).json({
    success: true,
    user,
  });
};

const updateUser = async (req, res) => {
  try {
    const updateData = {};

    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        updateData[key] = value;
      }
    });

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address || address.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const user = await User.findById(req.user._id);

    user.addresses = address;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: user.addresses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("addresses");

    return res.status(200).json({
      success: true,
      address: user.addresses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  updateAddress,
  getAddress,
};
