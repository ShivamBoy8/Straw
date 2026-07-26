import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

export default function ProductTable({ products, onDelete }) {
  // Tracks which product (if any) is pending delete confirmation,
  // so we can show a themed modal instead of the native browser confirm().
  const [pendingDelete, setPendingDelete] = useState(null);

  function askDelete(product) {
    setPendingDelete(product);
  }

  function cancelDelete() {
    setPendingDelete(null);
  }

  async function confirmDelete() {
    const product = pendingDelete;
    if (!product) return;

    setPendingDelete(null);

    try {
      await axios.delete(`${API_BASE}/products/delete/${product._id}`, {
        withCredentials: true,
      });

      onDelete(product._id);
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product.");
    }
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th width="180">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={
                      product.images?.[0]?.url ||
                      "https://placehold.co/60x70?text=No+Image"
                    }
                    alt={product.title}
                    style={{
                      width: 60,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </td>

                <td>{product.title}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>
                  {product.stock > 0 ? (
                    <span className="badge bg-success">{product.stock}</span>
                  ) : (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </td>

                <td>
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => askDelete(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Themed delete-confirmation modal (replaces window.confirm) */}
      {pendingDelete && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">Delete product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={cancelDelete}
                  ></button>
                </div>

                <div className="modal-body">
                  <p className="mb-0 text-muted">
                    This will permanently remove{" "}
                    <strong className="text-dark">{pendingDelete.title}</strong>{" "}
                    from your store. This action can't be undone.
                  </p>
                </div>

                <div className="modal-footer border-0">
                  <button className="btn btn-outline-dark" onClick={cancelDelete}>
                    Cancel
                  </button>
                  <button className="btn btn-dark" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
}