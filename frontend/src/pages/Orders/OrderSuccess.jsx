import { FiCheck, FiPackage, FiClock } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const { state } = useLocation();

  // Falls back to placeholders until the real order response is passed
  // via navigate("/order-success", { state: { orderId, estimatedDelivery } })
  const orderId = state?.orderId || `VLR${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = state?.estimatedDelivery || "3-5 business days";

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon-wrap">
          <FiCheck className="success-icon" />
        </div>

        <span className="success-eyebrow">Order Confirmed</span>
        <h1 className="success-title">Thank You for Your Order</h1>

        <p className="success-subtitle">
          Your order has been placed successfully with <strong>VELOUR</strong>.

        </p>

        <div className="success-details">
          <div className="success-detail-row">
            <span className="success-detail-label">
              <FiPackage /> Order ID
            </span>
            <span className="success-detail-value">{orderId}</span>
          </div>

          <div className="success-detail-divider" />

          <div className="success-detail-row">
            <span className="success-detail-label">
              <FiClock /> Estimated Delivery
            </span>
            <span className="success-detail-value">{estimatedDelivery}</span>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/orders" className="btn-success-primary">
            My Orders
          </Link>

          <Link to="/products" className="btn-success-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;