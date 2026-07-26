import React from "react";

const OrderSummary = ({
  itemCount,
  subtotal,
  deliveryCharge,
  total,
  savings,
  onProceedToCheckout,
  onBuyNow,
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

      <button className="btn-checkout" onClick={onProceedToCheckout}>
        PROCEED TO CHECKOUT
      </button>

      <button className="btn-buynow" onClick={onBuyNow}>
        BUY NOW
      </button>
    </div>
  );
};

export default OrderSummary;