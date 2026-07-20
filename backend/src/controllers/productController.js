const Product = require("../model/Product");
const validateproduct = require("../validators/productValidator");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const validateUpdateProduct = require("../validators/validateUpdateProduct");
const deleteFromCloudinary = require("../utils/deleteFromCloudinary");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    validateproduct(req.body, req.files);

    const {
      title,
      description,
      brand,
      category,
      subCategory,
      price,
      discountPrice,
      sizes,
      colors,
      stock,
      isFeatured,
    } = req.body;

    const uploadedImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer)),
    );

    const product = await Product.create({
      title,
      description,
      brand,
      category,
      subCategory,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : 0,
      images: uploadedImages,
      sizes,
      colors,
      stock: Number(stock),
      isFeatured,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }
    validateUpdateProduct(req.body);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (req.files?.length) {
      const uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer)),
      );

      for (const image of product.images) {
        await deleteFromCloudinary(image.public_id);
      }

      product.images = uploadedImages;
    }

    if (req.body.title !== undefined) product.title = req.body.title;

    if (req.body.description !== undefined)
      product.description = req.body.description;

    if (req.body.brand !== undefined) product.brand = req.body.brand;

    if (req.body.category !== undefined) product.category = req.body.category;

    if (req.body.subCategory !== undefined)
      product.subCategory = req.body.subCategory;

    if (req.body.sizes !== undefined) product.sizes = req.body.sizes;

    if (req.body.colors !== undefined) product.colors = req.body.colors;

    if (req.body.stock !== undefined) product.stock = Number(req.body.stock);

    if (req.body.price !== undefined) product.price = Number(req.body.price);

    if (req.body.discountPrice !== undefined)
      product.discountPrice = Number(req.body.discountPrice);

    if (req.body.isFeatured !== undefined)
      product.isFeatured = req.body.isFeatured;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    for (const image of product.images) {
      await deleteFromCloudinary(image.public_id);
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product with specific id not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      featured,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (featured !== undefined) {
      query.isFeatured = featured === "true";
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const currentPage = Number(page);
    const pageSize = Number(limit);
    const skip = (currentPage - 1) * pageSize;

    const totalProducts = await Product.countDocuments(query);

    let products = Product.find(query);

    if (sort) {
      products = products.sort(sort);
    } else {
      products = products.sort("-createdAt");
    }

    products = products.skip(skip).limit(pageSize);

    products = await products;

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      currentPage,
      totalPages: Math.ceil(totalProducts / pageSize),
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProduct,
};
