import { useEffect, useState } from "react";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";

import DashboardCards from "../../components/Admin/DashboardCards";

const API_BASE = import.meta.env.VITE_API_URL || "";

const isPending = (order) => {
  const status = (order.orderStatus || order.status || "").toLowerCase();
  return status === "pending";
};

const isDelivered = (order) => {
  const status = (order.orderStatus || order.status || "").toLowerCase();
  return status === "delivered";
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsRes, ordersRes] = await Promise.all([
        axios.get(`${API_BASE}/products`, {
          withCredentials: true,
        }),

        axios.get(`${API_BASE}/admin/orders`, {
          withCredentials: true,
        }),
      ]);

      const products = productsRes.data.products || productsRes.data || [];

      const orders = ordersRes.data.orders || ordersRes.data || [];

      setStats({
        totalProducts: products.length,

        totalOrders: orders.length,

        pendingOrders: orders.filter(isPending).length,

        deliveredOrders: orders.filter(isDelivered).length,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-wrap">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="mt-3">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-wrap">
        <MdErrorOutline className="error-icon" />

        <p>{error}</p>

        <button className="btn btn-primary" onClick={fetchDashboardData}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <h3 className="fw-bold mb-4" style={{ color: "#1a1f36" }}>
        Dashboard
      </h3>

      <DashboardCards stats={stats} />
    </>
  );
}
