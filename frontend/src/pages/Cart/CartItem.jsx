import React from "react";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { _id, product, size, quantity, price } = item;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={product.images?.[0]?.url} alt={product.title} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-name">{product.title}</h3>
        <p className="cart-item-brand">{product.brand}</p>
        <p className="cart-item-variant">
         Size : {size} 
        </p>
        <p className="cart-item-price">₹{price.toLocaleString("en-IN")}</p>

        <div className="cart-item-actions">
          <button className="cart-item-action-btn" onClick={() => onRemove(_id)}>
            REMOVE
          </button> 
        </div>
      </div>

      <div className="cart-item-quantity">
        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => onDecrease(_id)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="quantity-value">{quantity}</span>
          <button className="quantity-btn" onClick={() => onIncrease(_id)}>
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
