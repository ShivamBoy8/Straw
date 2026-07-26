import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductForm from "../../components/Admin/ProductForm";
import ImageUploader from "../../components/Admin/ImageUploader";

const API_BASE = import.meta.env.VITE_API_URL;

export default function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.warning("Please upload at least one image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("brand", formData.brand);
      data.append("category", formData.category);
      data.append("subCategory", formData.subCategory);
      data.append("price", formData.price);
      data.append("discountPrice", formData.discountPrice || 0);
      data.append("stock", formData.stock);
      data.append("isFeatured", formData.isFeatured);

      formData.sizes.forEach((size) => {
        data.append("sizes", size);
      });

      formData.colors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean)
        .forEach((color) => {
          data.append("colors", color);
        });

      images.forEach((image) => {
        data.append("images", image);
      });

      await axios.post(
        `${API_BASE}/products/create`,
        data,
        {
          withCredentials: true,
        }
      );

      toast.success("Product created successfully!");

      navigate("/admin/products");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Add Product
          </h2>

          <p className="text-muted mb-0">
            Create a new product for your store.
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <ProductForm
          formData={formData}
          setFormData={setFormData}
        />

        <ImageUploader
          images={images}
          setImages={setImages}
        />

        <button
          type="submit"
          className="btn btn-dark px-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>

      </form>

    </div>
  );
}