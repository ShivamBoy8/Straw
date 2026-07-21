const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const item = await Product.findById(product);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    if (Number(quantity) > item.stock) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const price = item.discountPrice > 0 ? item.discountPrice : item.price;
    const user = req.user._id;

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = await Cart.create({
        user,
        items: [
          {
            product,
            quantity,
            price,
          },
        ],
        totalPrice: quantity * price,
      });
    } else {
      const exist = cart.items.find((cartItem) =>
        cartItem.product.equals(product)
      );

      if (exist) {
        if (exist.quantity + quantity > item.stock) {
          return res.status(400).json({
            success: false,
            message: "Insufficient stock",
          });
        }

        exist.quantity += quantity;
      } else {
        cart.items.push({
          product,
          quantity,
          price,
        });
      }

      cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const user = req.user._id;

    const cart = await Cart.findOne({ user }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          totalPrice: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const user = req.user._id;
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const exist = cart.items.find((cartItem) => cartItem.product.equals(id));

    if (!exist) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    const productItem = await Product.findById(exist.product);

    if (!productItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (quantity > productItem.stock) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    exist.quantity = quantity;

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const user = req.user._id;
    const id = req.params.id.trim();

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const before = cart.items.length;

    cart.items = cart.items.filter((cartItem) => !cartItem.product.equals(id));

    if (before === cart.items.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const user = req.user._id;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  clearCart,
  removeCartItem,
};
