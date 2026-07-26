import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, cancelOrder } from "../../features/orders/orderSlice";
import { Link } from "react-router-dom";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import { useToast } from "../../components/Loader/ToastProvider";
import "./Orders.css";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
 
  const { orders, loading, error } = useSelector((state) => state.order);
 
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);
 
  const handleCancel = (id) => {
    toast.confirm("Are you sure you want to cancel this order?", {
      confirmText: "Yes, cancel",
      cancelText: "Keep order",
      onConfirm: async () => {
        try {
          await dispatch(cancelOrder(id)).unwrap();
          toast.success("Your order has been cancelled.");
          dispatch(getMyOrders());
        } catch (err) {
          toast.error(err || "Unable to cancel order. Please try again.");
        }
      },
    });
  };
 
  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-page-header">
          <span className="orders-eyebrow">Order History</span>
          <h1 className="orders-page-title">My Orders</h1>
        </div>
 
        {[1, 2].map((n) => (
          <div className="order-card" key={n}>
            <div className="order-header">
              <div className="skeleton-block skeleton-line skeleton-line-md" />
              <div className="skeleton-block skeleton-pill-sm" />
              <div className="skeleton-block skeleton-line skeleton-line-sm" />
            </div>
 
            <hr />
 
            <div className="order-item">
              <div className="skeleton-block skeleton-thumb" />
 
              <div className="skeleton-lines">
                <div className="skeleton-block skeleton-line skeleton-line-lg" />
                <div className="skeleton-block skeleton-line skeleton-line-sm" />
              </div>
 
              <div className="skeleton-block skeleton-line skeleton-line-sm" />
            </div>
          </div>
        ))}
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-status orders-error">{error}</div>
      </div>
    );
  }
 
  return (
    <div className="orders-page">
      <div className="orders-page-header">
        <span className="orders-eyebrow">Order History</span>
        <h1 className="orders-page-title">My Orders</h1>
      </div>
 
      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <FiPackage />
          </div>
 
          <h2 className="orders-empty-title">No Orders Yet</h2>
 
          <p className="orders-empty-subtitle">
            When you place an order, it will show up here.
          </p>
 
          <Link to="/products" className="btn-shop">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div className="order-header-block">
                  <span className="order-header-label">Order ID</span>
 
                  <p className="order-header-value order-id">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
 
                <div className="order-header-block">
                  <span className="order-header-label">Placed On</span>
 
                  <p className="order-header-value">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
 
                <div className="order-header-block">
                  <span className="order-header-label">Status</span>
 
                  <span
                    className={`status status-${order.orderStatus.toLowerCase()}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
 
                <div className="order-header-block order-header-block-right">
                  <span className="order-header-label">Total</span>
 
                  <p className="order-header-value">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </p>
 
                  <small className="text-muted">
                    {order.items.length} Item
                    {order.items.length > 1 ? "s" : ""}
                  </small>
                </div>
              </div>
 
              <hr className="order-divider" />
 
              <div className="order-items">
                {order.items
                  .filter((item) => item.product)
                  .slice(0, 2)
                  .map((item) => {
                    const price =
                      item.product.discountPrice > 0
                        ? item.product.discountPrice
                        : item.product.price;
 
                    return (
                      <div className="order-item" key={item._id}>
                        <div className="order-item-image">
                          <img
                            src={
                              item.product.images?.[0]?.url ||
                              "/placeholder.png"
                            }
                            alt={item.product.title}
                            loading="lazy"
                          />
                        </div>
 
                        <div className="order-item-details">
                          <h3 className="order-item-name">
                            {item.product.title}
                          </h3>
 
                          <p className="order-item-qty">Qty: {item.quantity}</p>
                        </div>
 
                        <strong className="order-item-price">
                          ₹{(price * item.quantity).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    );
                  })}
 
                {order.items.length > 2 && (
                  <p className="more-items">
                    +{order.items.length - 2} more item
                    {order.items.length - 2 > 1 ? "s" : ""}
                  </p>
                )}
              </div>
 
              <div className="order-footer">
                <span className="order-footer-text">
                  Thank you for shopping with VELOUR ❤️
                </span>
 
                {order.orderStatus !== "Cancelled" &&
                  order.orderStatus !== "Delivered" && (
                    <button
                      className="btn-cancel-order"
                      disabled={loading}
                      onClick={() => handleCancel(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default OrdersPage;