import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import ProductCard from "../ProductCard/ProductCard";
import "./TopPicks.css";

const TopPicks = ({
  title,
  eyebrow,
  subtitle,
  category,
  sort,
  subCategory,
  featured = false,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const getProducts = async () => {
      setLoading(true);
      try {
        let url = `/products?category=${category}&limit=8`;

        if (featured) url += "&featured=true";
        if (sort) url += `&sort=${sort}`;
        if (subCategory) url += `&subCategory=${subCategory}`;
        const response = await api.get(url, { signal: controller.signal });
        setProducts(response.data.products || []);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          console.error(err);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
    return () => controller.abort();
  }, [category, subCategory, sort]);

  // Loaded, empty, nothing to sell — don't render a broken-looking shell
  if (!loading && products.length === 0) return null;

  return (
    <section className="top-picks">
      <div className="top-picks-header">
        <div className="top-picks-heading-group">
          {eyebrow && <span className="top-picks-eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {subtitle && <p className="top-picks-subtitle">{subtitle}</p>}
        </div>

        <Link to={`/products?category=${category}`} className="view-all">
          View All <span className="view-all-arrow">→</span>
        </Link>
      </div>

      <div className="top-picks-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div className="product-card-skeleton" key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default TopPicks;
