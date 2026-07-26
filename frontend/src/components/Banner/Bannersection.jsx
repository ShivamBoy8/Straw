import React from "react";
import "./BannerSection.css";
import { Link } from "react-router-dom";
const BannerSection = ({
  image,
  bgColor = "#e3deda",
  eyebrow,
  heading = [],
  buttonText,
  description,
  onButtonClick,
  align = "left",
  minHeight,
}) => {
  return (
    <section
      className={`banner-section banner-align-${align}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundColor: bgColor,
        minHeight: minHeight,
      }}
    >
      <div className="banner-overlay-content">
        {eyebrow && <p className="banner-eyebrow">{eyebrow}</p>}

        {heading.length > 0 && (
          <h2 className="banner-heading">
            {heading.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < heading.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        )}

        {description && <p className="banner-desc">{description}</p>}

        {buttonText && (
          <Link to={"/men"}>
            <button
              className="btn btn-dark rounded-0 banner-btn"
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default BannerSection;
