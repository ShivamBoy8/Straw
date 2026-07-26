const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    brand: {
      type: String,
      trim: true,
      default:"STRAW"
    },

    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },
    subCategory: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      default:0,
      min: 0,
    },

    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          public_id: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one image is required",
      },
    },
    sizes: {
      type: [String],
      enum: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "UK 6",
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
      ],
      default: [],
    },
    colors: {
      type: [String],
      trim: true,
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
