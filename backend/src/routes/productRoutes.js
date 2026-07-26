const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {createProduct, updateProduct, deleteProduct, getProductById, getAllProduct, getSimilarProduct} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5),
  createProduct,
);

router.patch(
    "/update/:id",
    authMiddleware,
    adminMiddleware,
    upload.array("images",5),
    updateProduct
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);


router.get("/similar/:id", getSimilarProduct);
router.get("/", getAllProduct);
router.get("/:id", getProductById);

module.exports = router;
