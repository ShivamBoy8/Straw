import { useState } from "react";

import "./CategoryLanding.css";

import Category from "../../pages/Men/Category";
import TopPicks from "../TopPicks/TopPicks";
import PromoBanner from "../PromoBanner/PromoBanner";
import { Link } from "react-router-dom";

const CategoryLanding = ({
  category,
  heroImage,
  heading,
  subline,
  description,
  bannerImage,
  bannerTitle,
  bannerSubtitle,
  heroBackground,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [sort, setSort] = useState("-createdAt");

  return (
    <div className="gazu-homepage ">
      <section className="hero-section" style={{ background: heroBackground }}>
        <nav className="hero-breadcrumb">
          <a href="/">Home</a>

          <span>&gt;</span>

          <a href="#">{heading}</a>
        </nav>

        <div className="hero-wrapper" style={{ background: heroBackground }}>
          <div
            className="hero-img-frame"
            style={{ background: heroBackground }}
          >
            <img src={heroImage} alt={heading} className="hero-full-img" />
          </div>

          <div className="hero-heading">
            <h1>{heading}</h1>

            <p className="hero-subline">{subline}</p>

            <p className="hero-desc">{description}</p>
          </div>

          <div className="hero-buttons" style={{ background: heroBackground }}>
            <Link
              to={`/products?category=${category}`}
              className="btn btn-dark rounded-0"
            >
              SHOP NOW
            </Link>

            <Link
              to={`/products?category=${category}`}
              className="btn btn-outline-dark rounded-0"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      </section>

      <Category
        category={category}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        sort={sort}
        setSort={setSort}
      />

      <TopPicks
        title="TOP PICKS"
        eyebrow="Curated For You"
        category={category}
        subCategory={selectedSubCategory}
        featured
      />

      <TopPicks
        title="NEW ARRIVALS"
        eyebrow="Just Landed"
        category={category}
        sort="-createdAt"
      />

      <PromoBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        buttonText="SHOP NOW"
        link={`/products?category=${category}`}
      />

      <TopPicks
        title="BEST SELLERS"
        eyebrow="Most Loved"
        category={category}
        sort="-rating"
      />
    </div>
  );
};

export default CategoryLanding;
