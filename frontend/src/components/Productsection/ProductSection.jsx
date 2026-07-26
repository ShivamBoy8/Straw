import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductSection.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";

const ProductSection = ({
  title,
  products,
  link,
  tag = "Collection",
  subtitle = "Discover premium pieces designed for everyday elegance.",
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const isLoop = products.length > 4;

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="product-section">
      <div className="container-fluid">

        <div className="product-section-header">
          <div className="product-section-heading-group">
            {tag && <span className="product-section-eyebrow">{tag}</span>}

            <h2 className="product-section-title">
              {title}
            </h2>

            {subtitle && (
              <p className="product-section-subtitle">
                {subtitle}
              </p>
            )}
          </div>

          <Link to={link} className="product-section-link">
            <span>View All</span>
            <FiChevronRight className="product-section-link-arrow" />
          </Link>
        </div>

        <div className="slider-wrapper">

          {/* Previous */}
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous products"
            className={`slider-nav slider-nav-prev ${
              !isLoop && isBeginning
                ? "slider-nav-disabled"
                : ""
            }`}
          >
            <FiChevronLeft />
          </button>

          {/* Next */}
          <button
            ref={nextRef}
            type="button"
            aria-label="Next products"
            className={`slider-nav slider-nav-next ${
              !isLoop && isEnd
                ? "slider-nav-disabled"
                : ""
            }`}
          >
            <FiChevronRight />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={24}
            grabCursor
            loop={isLoop}
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();

                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              });
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
};

export default ProductSection;