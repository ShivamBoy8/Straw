import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove, onMoveToWishlist }) => {
  const { id, name, color, size, price, quantity, image } = item;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={name} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-name">{name}</h3>
        <p className="cart-item-variant">
          {color} {size && <>&nbsp;•&nbsp; {size}</>}
        </p>
        <p className="cart-item-price">₹{price.toLocaleString("en-IN")}</p>

        <div className="cart-item-actions">
          <button
            className="cart-item-action-btn"
            onClick={() => onRemove(id)}
          >
            REMOVE
          </button>
          <span className="cart-item-divider">|</span>
          <button
            className="cart-item-action-btn"
            onClick={() => onMoveToWishlist(id)}
          >
            MOVE TO WISHLIST
          </button>
        </div>
      </div>

      <div className="cart-item-quantity">
        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => onDecrease(id)}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="quantity-value">{quantity}</span>
          <button className="quantity-btn" onClick={() => onIncrease(id)}>
            +
          </button>
        </div>
      </div>

      <div className="cart-item-total">
        ₹{(price * quantity).toLocaleString("en-IN")}
      </div>
    </div>
  );
};

export default CartItem;