import { Link } from "react-router-dom";
import "./PromoBanner.css";

const PromoBanner = ({
  image,
  title,
  subtitle,
  buttonText,
  link,
}) => {
  return (
    <section
      className="promo-banner"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="promo-overlay">
        <div className="promo-content">
          <h2>{title}</h2>

          <p>{subtitle}</p>

          <Link
            to={link}
            className="promo-btn"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;