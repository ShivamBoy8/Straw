import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductTable from "../../components/Admin/ProductTable";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE}/products`, {
        withCredentials: true,
      });

      setProducts(res.data.products || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Products</h3>
          <p className="text-muted mb-0">Manage all store products</p>
        </div>

        <Link to="/admin/products/new" className="btn btn-dark">
          + Add Product
        </Link>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <ProductTable
          products={products}
          onDelete={(id) =>
            setProducts((prev) => prev.filter((product) => product._id !== id))
          }
        />
      )}
    </>
  );
}
