import React from "react";
import "./Category.css";
import { FaTshirt } from "react-icons/fa";
import { PiShirtFoldedLight } from "react-icons/pi";
import {
  GiHoodie,
  GiArmoredPants,
  GiTrousers,
  GiRunningShoe,
  GiBilledCap,
} from "react-icons/gi";
import { TbJacket } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import { categoryData } from "../../data/categoryData";

const ICON_SIZE = 20;



const Category = ({
  category,
  selectedSubCategory,
  setSelectedSubCategory,
  sort,
  setSort,
}) => {
  const isActive = (item) => {
    if (item.value === "ALL") return selectedSubCategory === "" && sort === "";
    if (item.value === "NEW_IN")
      return selectedSubCategory === "" && sort === "-createdAt";
    return selectedSubCategory === item.value;
  };

  const CATEGORIES = categoryData[category] || [];

  const handleClick = (item) => {
    if (item.value === "ALL") {
      setSelectedSubCategory("");
      setSort("");
      return;
    }
    if (item.value === "NEW_IN") {
      setSelectedSubCategory("");
      setSort("-createdAt");
      return;
    }
    setSelectedSubCategory(item.value);
    setSort("-createdAt");
  };

  return (
    <section className="category-nav">
      <div className="category-nav-scroll">
        {CATEGORIES.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`category-pill ${isActive(item) ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            <span className="category-pill-icon">
              <item.Icon size={ICON_SIZE} />
            </span>
            <span className="category-pill-label">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Category;