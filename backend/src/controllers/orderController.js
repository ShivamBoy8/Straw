const mongoose = require("mongoose");
const Cart = require("../model/Cart");
const Order = require("../model/Order");

const createOrder = async (req, res) => {
  try {
    const user = req.user._id;
    const cart = await Cart.findOne({ user }).populate("items.product");
    const { shippingAddress } = req.body;

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${item.product.title} is out of stock`,
        });
      }
    }

    for (const item of cart.items) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    const order = await Order.create({
      user,
      items: cart.items,
      shippingAddress,
      totalPrice: cart.totalPrice,
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    await order.populate("items.product");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const user = req.user._id;
    const order = await Order.find({ user })
      .sort({ createdAt: -1 })
      .populate("items.product");

    if (order.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found",
        order: [],
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const user = req.user._id;
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.user.equals(user)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this order",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const user = req.user._id;
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.user.equals(user)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this order",
      });
    }

    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    for (const item of order.items) {
      item.product.stock += item.quantity;
      await item.product.save();
    }

    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }
    const { orderStatus } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: `Order is already ${order.orderStatus}`,
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
