import { useDispatch } from "react-redux";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart, getCart } from "../../features/cart/cartSlice";
import { useState } from "react";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);

  const image =
    product.images?.[0]?.url ||
    product.image ||
    "https://placehold.co/600x800?text=No+Image";

  const handleNavigate = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = async () => {
  try {
    setAdding(true);

    await dispatch(addToCart({
      product: product._id,
      quantity: 1,
      size: product.sizes?.[0] || "",
    })).unwrap();

    await dispatch(getCart()).unwrap();
  } finally {
    setAdding(false);
  }
};

  return (
    <div className="product-card">
      <div className="product-image" onClick={handleNavigate}>
        <img src={image} alt={product.title} loading="lazy" />
      </div>

      <div className="product-info">
        <h3 onClick={handleNavigate}>{product.title}</h3>

        <div className="price-row">
          {product.discountPrice > 0 ? (
            <>
              <span className="discount-price">₹{product.discountPrice}</span>

              <span className="original-price">₹{product.price}</span>
            </>
          ) : (
            <span className="discount-price">₹{product.price}</span>
          )}
        </div>

        <button
          className="add-to-bag"
          onClick={handleAddToCart}
         disabled={adding || product.stock === 0}
        >
          {product.stock === 0
            ? "Out of Stock"
            : adding
              ? "Adding..."
              : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
