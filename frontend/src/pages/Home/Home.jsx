import React from "react";
import "../Home/Home.css"
import heroImage from "../../assets/assetsfooter/hero.jpeg";
import Men from "../../assets/assetsfooter/Gazu3.jpeg";
import Women from "../../assets/assetsfooter/Gazu4.jpeg";
import Kids from "../../assets/assetsfooter/Gazu5.jpeg";
import { FiLock, FiPackage, FiShield, FiTruck } from "react-icons/fi";
import NewVibes from "./NewVibes";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductSection from "../../components/Productsection/ProductSection";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  {
    img: Men,
    title: "MEN",
    desc: "Elevated everyday essentials.",
    href: "/men",
    label: "SHOP MEN",
  },
  {
    img: Women,
    title: "WOMEN",
    desc: "Effortless style for every you.",
    href: "/women",
    label: "SHOP WOMEN",
  },
  {
    img: Kids,
    title: "KIDS",
    desc: "Comfort meets cool everyday.",
    href: "/kids",
    label: "SHOP KIDS",
  },
];

const features = [
  {
    Icon: FiTruck,
    title: "FAST DELIVERY",
    desc: "Quick & safe delivery",
  },
  {
    Icon: FiPackage,
    title: "EASY RETURNS",
    desc: "Within 15 days",
  },
  {
    Icon: FiShield,
    title: "QUALITY ASSURED",
    desc: "Best fashion, best quality",
  },
  {
    Icon: FiLock,
    title: "SECURE PAYMENT",
    desc: "100% secure checkout",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products", {
        params: {
          limit: 50,
        },
      });

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const featuredProducts = products.slice(0, 8);

  const menProducts = products
    .filter((product) => product.category === "Men")
    .slice(0, 8);

  const womenProducts = products
    .filter((product) => product.category === "Women")
    .slice(0, 8);

  const kidsProducts = products
    .filter((product) => product.category === "Kids")
    .slice(0, 8);
  return (
    <div className="gz-homepage">
      <section className="gz-hero-section">
        <div className="gz-hero-wrapper">
          <div className="gz-hero-img-frame">
            <img src={heroImage} alt="Hero" className="gz-hero-img" />
          </div>

          <div className="gz-hero-tagline">
            <p>
              FASHION
              <br />
              THAT MOVES
              <br />
              WITH YOU.
            </p>
            <div className="gz-line-bar"></div>
          </div>

          {/* Bottom Left */}
          <div className="gz-hero-buttons">
            <button
              className="btn btn-dark rounded-0"
              onClick={() => navigate("/products")}
            >
              SHOP NOW
            </button>
            <button
              className="btn btn-outline-dark rounded-0"
              onClick={() => navigate("/products?sort=newest")}
            >
              EXPLORE NEW IN
            </button>
          </div>

          {/* Bottom Right */}
          <div className="gz-hero-collection">
            <p>
              NEW
              <br />
              COLLECTION
              <br />
              2026
            </p>
            <div className="gz-line-bar"></div>
          </div>
        </div>
      </section>

      <section className="gz-category-section py-3 py-md-5 px-3 px-md-4">
        <div className="container-fluid">
          <div className="row g-4 justify-content-center">
            {categories.map((c) => (
              <div className="col-12 col-md-4" key={c.title}>
                <div className="gz-category-card">
                  <img src={c.img} alt={c.title} className="gz-category-img" />
                  <div>
                    <h3 className="gz-category-title">{c.title}</h3>
                    <p className="gz-category-desc">{c.desc}</p>
                    <Link to={c.href} className="gz-category-link">
                      {c.label} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gz-feature-bar py-4 px-4">
        <div className="container-fluid">
          <div className="row text-center g-4">
            {features.map(({ Icon, title, desc }) => (
              <div className="col-6 col-md-3" key={title}>
                <div className="gz-feature-item">
                  <Icon className="gz-feature-icon" />

                  <div className="text-start">
                    <h6 className="gz-feature-title">{title}</h6>
                    <p className="gz-feature-desc">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewVibes />

      {loading ? (
        <div className="text-center py-5">
          <h4>Loading products...</h4>
        </div>
      ) : (
        <>
          {featuredProducts.length > 0 && (
            <ProductSection
              title="Featured Products"
              tag="Handpicked"
              subtitle="Our top picks across the entire store, refreshed regularly."
              products={featuredProducts}
              link="/products"
            />
          )}

          {menProducts.length > 0 && (
            <ProductSection
              title="Men's Collection"
              tag="For Him"
              subtitle="Elevated everyday essentials, built to move with you."
              products={menProducts}
              link="/products?category=Men"
            />
          )}

          {womenProducts.length > 0 && (
            <ProductSection
              title="Women's Collection"
              tag="For Her"
              subtitle="Effortless style pieces for every version of you."
              products={womenProducts}
              link="/products?category=Women"
            />
          )}

          {kidsProducts.length > 0 && (
            <ProductSection
              title="Kids Collection"
              tag="For Kids"
              subtitle="Comfort meets cool, made for everyday adventures."
              products={kidsProducts}
              link="/products?category=Kids"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;