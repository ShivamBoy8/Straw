import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_BASE}/admin/orders/${id}`, {
        withCredentials: true,
      });

      setOrder(res.data.order || null);
      setStatus(res.data.order?.orderStatus || "Pending");
    } catch (err) {
      setOrder(null);
      setError("Unable to load order details.");
      toast.error("Unable to load order");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus() {
    try {
      setUpdating(true);

      await axios.patch(
        `${API_BASE}/admin/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Order updated");
      navigate("/admin/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <h3>Loading...</h3>;

  if (error || !order) {
    return (
      <div className="container-fluid py-4">
        <h2 className="fw-bold mb-3">Order Details</h2>
        <div className="alert alert-danger">{error || "Order not found."}</div>
        <button className="btn btn-dark" onClick={fetchOrder}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Order Details</h2>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5>Customer</h5>

          <p>
            <strong>Name:</strong> {order.user?.name || "N/A"}
          </p>

          <p>
            <strong>Email:</strong> {order.user?.email || "N/A"}
          </p>

          <p>
            <strong>Shipping:</strong> {order.shippingAddress || "N/A"}
          </p>

          <p>
            <strong>Total:</strong> ₹{order.totalPrice ?? 0}
          </p>

          <p>
            <strong>Payment:</strong> {order.paymentMethod || "N/A"}
          </p>

          <p>
            <strong>Payment Status:</strong> {order.paymentStatus || "N/A"}
          </p>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="mb-3">Ordered Products</h5>

          {order.items?.length ? (
            order.items.map((item) => (
              <div key={item._id} className="d-flex align-items-center mb-3">
                <img
                  src={item.product?.images?.[0]?.url || "/placeholder.png"}
                  alt={item.product?.title || "Product"}
                  style={{
                    width: 80,
                    height: 90,
                    objectFit: "cover",
                  }}
                />

                <div className="ms-3">
                  <h6 className="mb-1">{item.product?.title || "Product"}</h6>

                  <div>Qty : {item.quantity}</div>

                  <div>Size : {item.size || "N/A"}</div>

                  <div>₹{item.price ?? 0}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted mb-0">No items found for this order.</p>
          )}
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5>Order Status</h5>

          <select
            className="form-select my-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button
            className="btn btn-dark"
            onClick={updateStatus}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}
