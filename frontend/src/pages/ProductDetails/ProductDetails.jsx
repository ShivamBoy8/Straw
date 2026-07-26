import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "./ProductDetails.css";
import { GiPartyPopper } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../../features/cart/cartSlice";
import ProductSection from "../../components/Productsection/ProductSection";
import AISizeRecommendation from "../../components/AISizeRecommendation/AISizeRecommendation";
import { resolveColor } from "../../utils/colorMap";

const STAR_PATH =
  "M12 2.5l2.9 6.26 6.9.6-5.23 4.6 1.58 6.79L12 17.27 5.85 20.75l1.58-6.79L2.2 9.36l6.9-.6L12 2.5z";

const Star = ({ fillPercent }) => (
  <span className="pd-star-wrap">
    <svg className="pd-star" viewBox="0 0 24 24" fill="#e4ded3">
      <path d={STAR_PATH} />
    </svg>
    <span className="pd-star-fill" style={{ width: `${fillPercent}%` }}>
      <svg className="pd-star" viewBox="0 0 24 24" fill="#ebb00e">
        <path d={STAR_PATH} />
      </svg>
    </span>
  </span>
);

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/products/${id}`);
      const data = response.data.product;

      setProduct(data);
      setSelectedImage(data.images?.[0]?.url || "");
      if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  const getSimilar=async()=>{
    try{
      const response=await api.get(`/products/similar/${id}`);
      setSimilarProducts(response.data);
    }catch(err){
      console.log(err);
    }
  }

  const handleAddToCart = async () => {
    try {
      await dispatch(
        addToCart({
          product: product._id,
          quantity,
          size: selectedSize,
        }),
      ).unwrap();

      const result = await dispatch(getCart()).unwrap();
    
    } catch (err) {
      alert(err);
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const { loading: addingToCart } = useSelector((state) => state.cart);

  useEffect(() => {
  getProduct();
  getSimilar();
}, [id]);

  if (loading) {
    return <div className="pd-status">Loading product…</div>;
  }

  if (error) {
    return <div className="pd-status is-error">{error}</div>;
  }

  const hasImages = product.images?.length > 0;
  const hasMultipleImages = product.images?.length > 1;
  const hasDescription = Boolean(product.description);
  const hasBrand = Boolean(product.brand);
  const hasCategory = Boolean(product.category);
  const hasSubCategory = Boolean(product.subCategory);
  const hasCategoryLine = hasCategory || hasSubCategory;
  const hasDiscount = product.discountPrice > 0;
  const hasSizes = product.sizes?.length > 0;
  const hasColors = product.colors?.length > 0;
  const hasRating = product.rating > 0;
  const hasReviews = product.numReviews > 0;

  const stockState =
    product.stock === 0 ? "out" : product.stock <= 5 ? "low" : "in";
  const stockLabel =
    product.stock === 0
      ? "Out of stock"
      : product.stock <= 5
        ? `Only ${product.stock} left`
        : "In stock";

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  return (
    <div className="pd-scope">
      <div className="pd-wrap">
        {hasCategoryLine && (
          <div className="pd-crumb">
            {[product.category, product.subCategory]
              .filter(Boolean)
              .join(" / ")}
          </div>
        )}

        <div className="pd-grid">
          {hasImages && (
            <div className="pd-gallery">
              <div className="pd-main-shot">
                {hasDiscount && (
                  <span className="pd-sale-flag">-{discountPercent}%</span>
                )}
                <img src={selectedImage} alt={product.title} />
              </div>

              {hasMultipleImages && (
                <div className="pd-thumbs">
                  {product.images.map((image, index) => (
                    <button
                      key={image._id || index}
                      type="button"
                      className={`pd-thumb ${
                        selectedImage === image.url ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <img src={image.url} alt={product.title} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div className="pd-info">
            {hasBrand && <span className="pd-eyebrow">{product.brand}</span>}

            <h1 className="pd-title">{product.title}</h1>

            {hasRating && (
              <div className="pd-rating-row">
                <span className="pd-stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      fillPercent={
                        Math.max(0, Math.min(1, product.rating - i)) * 100
                      }
                    />
                  ))}
                </span>
                <span className="pd-rating-num">
                  {product.rating.toFixed(1)}
                </span>
                {hasReviews && (
                  <span className="pd-review-count">
                    ({product.numReviews} Reviews)
                  </span>
                )}
              </div>
            )}

            <div className="pd-price-row">
              {hasDiscount ? (
                <>
                  <span className="pd-price is-discounted">
                    ₹{product.discountPrice}
                  </span>
                  <span className="pd-price-strike">₹{product.price}</span>
                  <span className="pd-save-pill">
                    <GiPartyPopper size={16} /> You Save ₹
                    {product.price - product.discountPrice}
                  </span>
                </>
              ) : (
                <span className="pd-price">₹{product.price}</span>
              )}
            </div>

            {hasDescription && <p className="pd-desc">{product.description}</p>}

            {hasColors && (
              <>
                <p className="pd-section-label">Color</p>
                <div className="pd-colors">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`pd-color-swatch ${
                        selectedColor === color ? "is-selected" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span
                        className="pd-color-dot"
                        style={{ background: resolveColor(color) }}
                      />
                      <span className="pd-color-name">{color}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {hasSizes && (
              <>
                <p className="pd-section-label">Size</p>
                <div className="pd-size-ruler">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`pd-size-tick ${
                        selectedSize === size ? "is-selected" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

            <AISizeRecommendation product={product} />

            <hr className="pd-divider" />

            <p className="pd-section-label">Quantity</p>
            <div className="pd-stepper">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={increaseQuantity}>
                +
              </button>
            </div>

            <div className={`pd-stock ${stockState}`}>
              <span className="pd-stock-dot" />
              {stockLabel}
            </div>

            <button
              className="pd-cta"
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
            >
              {product.stock === 0
                ? "Out of Stock"
                : addingToCart
                  ? "Adding…"
                  : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>

     {similarProducts.length > 0 && (
  <ProductSection
    title="You May Also Like"
    products={similarProducts}
    link={`/products?category=${product.category}`}
    tag="Recommended"
  />
)}
    </div>
  );
};

export default ProductDetails;
