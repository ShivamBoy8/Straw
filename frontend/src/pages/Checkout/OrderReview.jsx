import { useSelector } from "react-redux";

const OrderReview = () => {
  const items = useSelector((state) => state.cart.items);

  return (
    <section className="checkout-section">
      <div className="checkout-section-header">
        <span className="checkout-section-number">02</span>
        <h2 className="checkout-section-title">Order Review</h2>
      </div>

      <div className="review-list">
        {items.map((item) => (
          <div className="review-item" key={item._id || item.id}>
            <div className="review-item-image">
              {item.product.images[0].url ? (
                <img src={item.product.images[0].url} alt={item.product.title} />
              ) : (
                <div className="review-item-image-fallback" />
              )}
            </div>

            <div className="review-item-details">
              <p className="review-item-name">{item.name}</p>
              {(item.variant || item.size || item.color) && (
                <p className="review-item-variant">
                  {[item.size, item.color, item.variant]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              <p className="review-item-qty">Qty: {item.quantity}</p>
            </div>

            <p className="review-item-price">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderReview;