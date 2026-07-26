import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import "./Cart.css";
import { FiTruck, FiRefreshCw, FiShield, FiTrash2, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../../features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();

  const { items, totalPrice, loading, error } = useSelector(
    (state) => state.cart,
  );

  const FREE_DELIVERY_THRESHOLD = 999;
  const DELIVERY_CHARGE = 99;

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleIncrease = async (itemId) => {
    const item = items.find((item) => item._id === itemId);

    if (!item) return;

    try {
      await dispatch(
        updateCartQuantity({
          itemId,
          quantity: item.quantity + 1,
        }),
      ).unwrap();
    } catch (err) {
      toast.error(err || "Unable to update quantity.");
    }
  };

  const handleDecrease = async (itemId) => {
    const item = items.find((item) => item._id === itemId);

    if (!item || item.quantity === 1) return;

    try {
      await dispatch(
        updateCartQuantity({
          itemId,
          quantity: item.quantity - 1,
        }),
      ).unwrap();
    } catch (err) {
      toast.error(err || "Unable to update quantity.");
    }
  };
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleRemove = async (itemId) => {
    try {
      await dispatch(removeCartItem(itemId)).unwrap();
    } catch (err) {
      console.log(err);
      toast.error(err || "Unable to remove item.");
    }
  };
  const handleClearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your shopping cart?"
    );

    if (!confirmClear) return;

    try {
      await dispatch(clearCart()).unwrap();
    } catch (err) {
      toast.error(err || "Unable to clear cart.");
    }
  };

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout...");
  };


  const subtotal = totalPrice;

  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;

  const total = subtotal + deliveryCharge;

  const amountLeftForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotal,
    0,
  );

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-page-header">
          <div className="cart-header-titles">
            <span className="cart-eyebrow">Your Selection</span>
            <h1 className="cart-page-title">Shopping Cart</h1>
          </div>
        </div>
        <div className="cart-page-content">
          <div className="cart-items-container">
            {[1, 2, 3].map((n) => (
              <div className="skeleton-item" key={n}>
                <div className="skeleton-block skeleton-image" />
                <div className="skeleton-lines">
                  <div className="skeleton-block skeleton-line skeleton-line-lg" />
                  <div className="skeleton-block skeleton-line skeleton-line-sm" />
                  <div className="skeleton-block skeleton-line skeleton-line-md" />
                </div>
                <div className="skeleton-block skeleton-pill" />
              </div>
            ))}
          </div>
          <div className="order-summary-container">
            <div className="skeleton-summary">
              <div className="skeleton-block skeleton-line skeleton-line-md" />
              <div className="skeleton-block skeleton-line skeleton-line-sm" />
              <div className="skeleton-block skeleton-line skeleton-sm" />
              <div className="skeleton-block skeleton-line skeleton-line-sm" />
              <div className="skeleton-block skeleton-cta" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Only show the full-page error state when the cart genuinely has
  // nothing to display (e.g. the initial getCart() fetch failed).
  // Previously this fired on ANY error in state — including a single
  // updateCartQuantity rejection for insufficient stock — which wiped
  // out the entire cart view even though the items had loaded fine.
  // Per-action failures (increase/decrease/remove/clear) are now
  // surfaced as toasts instead, so the cart stays visible.
  if (error && items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-status cart-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <div className="cart-header-titles">
          <span className="cart-eyebrow">Your Selection</span>
          <h1 className="cart-page-title">
            Shopping Cart
            {items.length > 0 && (
              <span className="cart-count-badge">{items.length}</span>
            )}
          </h1>
        </div>

        <div className="cart-header-actions">
          <button
            className="cart-clear-btn"
            onClick={handleClearCart}
            disabled={items.length === 0}
          >
            <FiTrash2 />
            <span>Clear Bag</span>
          </button>

          <Link to="/products" className="continue-shopping-link">
            <span>Continue Shopping</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>

      <div className="cart-page-content">
        <div className="cart-items-container">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <h2 className="cart-empty-title">Your Bag is Empty</h2>
              <p className="cart-empty-subtitle">
                Looks like you haven't added anything yet.
              </p>
              <Link to="/products" className="btn-shop">
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))
          )}

          <div className="cart-benefits">
            <div className="benefit-item">
              <FiTruck className="benefit-icon" />

              <div>
                <p className="benefit-title">FREE DELIVERY</p>

                <p className="benefit-subtitle">On orders above ₹999</p>
              </div>
            </div>

            <div className="benefit-divider"></div>

            <div className="benefit-item">
              <FiRefreshCw className="benefit-icon" />

              <div>
                <p className="benefit-title">EASY RETURNS</p>

                <p className="benefit-subtitle">Within 15 days</p>
              </div>
            </div>

            <div className="benefit-divider"></div>

            <div className="benefit-item">
              <FiShield className="benefit-icon" />

              <div>
                <p className="benefit-title">SECURE PAYMENT</p>

                <p className="benefit-subtitle">100% Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>

        {items.length > 0 && (
          <div className="order-summary-container">
            <OrderSummary
              itemCount={itemCount}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              total={total}
              savings={0}
              amountLeftForFreeDelivery={amountLeftForFreeDelivery}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;