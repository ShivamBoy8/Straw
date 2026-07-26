import { useState } from "react";
import { FiLock, FiShoppingBag } from "react-icons/fi";
import AddressCard from "./AddressCard";
import OrderReview from "./OrderReview";
import PaymentMethod from "./PaymentMethod";
import { useToast } from "../../components/Loader/ToastProvider";
import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { placeOrder } from "../../features/orders/orderSlice";
import { resetCart } from "../../features/cart/cartSlice";

const FREE_DELIVERY_THRESHOLD = 999;
const DELIVERY_CHARGE = 99;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { address } = useSelector((state) => state.address);
  const { loading } = useSelector((state) => state.order);

  const { items, totalPrice } = useSelector((state) => state.cart);

  const [selectedPayment, setSelectedPayment] = useState("cod");

  const showToast = (message, type = "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const subtotal = totalPrice;
  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!address) {
      showToast("Please add your delivery address.");
      return;
    }

    try {
      await dispatch(placeOrder(address)).unwrap();

      dispatch(resetCart());
      showToast("Order placed successfully!", "success");
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Something went wrong placing your order.";
      showToast(message);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-page-header">
        <span className="checkout-eyebrow">
          <FiLock /> Secure Checkout
        </span>
        <h1 className="checkout-page-title">Checkout</h1>
      </div>

      <div className="checkout-page-content">
        <div className="checkout-main">
          <AddressCard />

          <OrderReview />

          <PaymentMethod
            selected={selectedPayment}
            onSelect={setSelectedPayment}
          />
        </div>

        <div className="checkout-summary-container">
          <div className="checkout-summary">
            <h2 className="checkout-summary-title">Order Summary</h2>

            <div className="checkout-summary-row">
              <span>Subtotal ({itemCount} items)</span>
              <span className="checkout-summary-value">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="checkout-summary-row">
              <span>Delivery</span>
              <span className="checkout-summary-value">
                {deliveryCharge === 0 ? (
                  <span className="checkout-free-tag">FREE</span>
                ) : (
                  `₹${deliveryCharge}`
                )}
              </span>
            </div>

            <hr className="checkout-summary-divider" />

            <div className="checkout-summary-row checkout-total-row">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button
              className="btn-place-order"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            {!address && (
              <p className="checkout-summary-hint">
                Please add a delivery address.
              </p>
            )}

            <p className="checkout-secure-note">
              <FiLock /> Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;