import "./ProductCard.css";
import tshirt from "../../assets/tshirts.jpg";

const products = [
  {
    id: 1,
    name: "Oversized T-Shirt",
    price: 799,
    image: tshirt,
    hoverImage: tshirt,
    category: "Men",
    rating: 4.8,
    isNew: true
  }
];

function ProductCard() {
  return (
    <div className="product-card ">
      {products.map((product) => (
        <div key={product.id}>
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <div className="quick-add">Quick Add +</div>
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;