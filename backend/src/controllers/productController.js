const Product = require("../model/Product");
const validateproduct = require("../validators/productValidator");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

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

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer);

      uploadedImages.push(result);
    }

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


module.exports = createProduct;