import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OrderTable from "../Admin/OrderTable";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await axios.get(`${API_BASE}/admin/orders`, {
        withCredentials: true,
      });

      setOrders(res.data.orders);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Orders</h2>

        <span className="badge bg-dark fs-6">
          {orders.length} Orders
        </span>
      </div>

      <OrderTable orders={orders} />
    </div>
  );
}