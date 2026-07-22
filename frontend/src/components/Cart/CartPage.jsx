import React, { useState } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import {
  cartData,
  FREE_DELIVERY_THRESHOLD,
  DELIVERY_CHARGE,
} from "../../data/cartData";
import "./Cart.css";
import { FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";

const CartPage = () => {
  const [items, setItems] = useState(cartData);

  const handleIncrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToWishlist = (id) => {
    handleRemove(id);
  };

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const handleBuyNow = () => {
    console.log("Buy now clicked...");
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_CHARGE;

  const total = subtotal + deliveryCharge;

  const savings = 403;

  const amountLeftForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotal,
    0
  );

  return (
    <div className="cart-page">

      {/* Header */}

      <div className="cart-page-header">

        <div>

          <h1 className="cart-page-title">
            SHOPPING CART ({items.length})
          </h1>

          {amountLeftForFreeDelivery > 0 && (
            <p className="cart-free-delivery-note">
              You're ₹{amountLeftForFreeDelivery} away from free delivery!
            </p>
          )}

        </div>

        <a href="/shop" className="continue-shopping-link">
          <span className="continue-shopping-text">
            CONTINUE SHOPPING
          </span>

          <span className="continue-shopping-arrow">
            →
          </span>
        </a>

      </div>

      {/* Main Content */}

      <div className="cart-page-content">

        {/* Left Side */}

        <div className="cart-items-container">

          {items.length === 0 ? (

            <p className="cart-empty-message">
              Your cart is empty.
            </p>

          ) : (

            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
                onMoveToWishlist={handleMoveToWishlist}
              />
            ))

          )}

          {/* Benefits */}

          <div className="cart-benefits">

            <div className="benefit-item">

              <FiTruck className="benefit-icon" />

              <div>

                <p className="benefit-title">
                  FREE DELIVERY
                </p>

                <p className="benefit-subtitle">
                  On orders above ₹999
                </p>

              </div>

            </div>

            <div className="benefit-divider"></div>

            <div className="benefit-item">

              <FiRefreshCw className="benefit-icon" />

              <div>

                <p className="benefit-title">
                  EASY RETURNS
                </p>

                <p className="benefit-subtitle">
                  Within 15 days
                </p>

              </div>

            </div>

            <div className="benefit-divider"></div>

            <div className="benefit-item">

              <FiShield className="benefit-icon" />

              <div>

                <p className="benefit-title">
                  SECURE PAYMENT
                </p>

                <p className="benefit-subtitle">
                  100% Secure Checkout
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}

        {items.length > 0 && (

          <div className="order-summary-container">

            <OrderSummary
              itemCount={items.length}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              total={total}
              savings={savings}
              onProceedToCheckout={handleProceedToCheckout}
              onBuyNow={handleBuyNow}
            />

          </div>

        )}

      </div>

    </div>
  );
};

export default CartPage;