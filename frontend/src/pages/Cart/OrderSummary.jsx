import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({
  itemCount,
  subtotal,
  deliveryCharge,
  total,
  savings,
  onProceedToCheckout,
}) => {
  return (
    <div className="order-summary">
      <h2 className="order-summary-title">ORDER SUMMARY</h2>

      <div className="order-summary-row">
        <span>Subtotal ({itemCount} Items)</span>
        <span className="order-summary-value">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="order-summary-row">
        <span>Delivery Charges</span>
        <span className="order-summary-value">
          {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
        </span>
      </div>

      <hr className="order-summary-divider" />

      <div className="order-summary-row total-row">
        <span>Total</span>
        <span className="order-summary-value">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      {savings > 0 && (
        <p className="order-summary-savings">
          You will save ₹{savings.toLocaleString("en-IN")} on this order
        </p>
      )}

      <Link to={"/checkout"}><button className="btn-checkout" onClick={onProceedToCheckout}>
        PROCEED TO CHECKOUT
      </button>
      </Link>

     
    </div>
  );
};

export default OrderSummary;