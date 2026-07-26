import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/Admin/ProductForm";
import ImageUploader from "../../components/Admin/ImageUploader";

const API_BASE = import.meta.env.VITE_API_URL;

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "STRAW",
    category: "Men",
    subCategory: "",
    price: "",
    discountPrice: "",
    stock: "",
    sizes: [],
    colors: "",
    isFeatured: false,
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      const res = await axios.get(`${API_BASE}/products/${id}`);

      const product = res.data.product;

      setFormData({
        title: product.title,
        description: product.description,
        brand: product.brand,
        category: product.category,
        subCategory: product.subCategory,
        price: product.price,
        discountPrice: product.discountPrice,
        stock: product.stock,
        sizes: product.sizes,
        colors: product.colors.join(", "),
        isFeatured: product.isFeatured,
      });

      setExistingImages(product.images);
    } catch (err) {
      toast.error("Unable to load product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setUpdating(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("brand", formData.brand);
      data.append("category", formData.category);
      data.append("subCategory", formData.subCategory);
      data.append("price", formData.price);
      data.append("discountPrice", formData.discountPrice);
      data.append("stock", formData.stock);
      data.append("isFeatured", formData.isFeatured);

      formData.sizes.forEach((size) => {
        data.append("sizes", size);
      });

      formData.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .forEach((color) => {
          data.append("colors", color);
        });

      images.forEach((image) => {
        data.append("images", image);
      });

      await axios.patch(
        `${API_BASE}/products/update/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      toast.success("Product updated successfully");

      navigate("/admin/products");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update failed"
      );
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit}>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
        />

        <ImageUploader
          images={images}
          setImages={setImages}
          existingImages={existingImages}
        />

        <button
          className="btn btn-dark"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}