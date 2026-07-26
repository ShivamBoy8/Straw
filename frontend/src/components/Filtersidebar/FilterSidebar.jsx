import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

const FilterSidebar = ({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedPrice,
  setSelectedPrice,
  size,
  setSize,
}) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    size: true,
    price: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const Section = ({ id, title, children }) => (
    <div className="border-bottom py-3">
      <button
        className="btn d-flex justify-content-between align-items-center w-100 p-0 border-0 bg-transparent"
        onClick={() => toggleSection(id)}
        aria-expanded={openSections[id]}
      >
        <span className="fw-semibold small text-uppercase text-dark">
          {title}
        </span>
        {openSections[id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[id] && <div className="mt-3">{children}</div>}
    </div>
  );

  const FilterContent = () => (
    <>
      <Section id="category" title="Category">
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id="all"
            checked={category === ""}
            onChange={() => setCategory("")}
          />
          <label className="form-check-label small" htmlFor="all">
            All Products
          </label>
        </div>

        {["Men", "Women", "Kids"].map((label) => (
          <div className="form-check mb-2" key={label}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={label.toLowerCase()}
              checked={category === label}
              onChange={() => setCategory(label)}
            />
            <label
              className="form-check-label small"
              htmlFor={label.toLowerCase()}
            >
              {label}
            </label>
          </div>
        ))}
      </Section>

      <Section id="size" title="Size">
        <div className="d-flex flex-wrap gap-2">
          {[
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL",
            "28",
            "30",
            "32",
            "34",
            "36",
            "38",
            "UK 6",
            "UK 7",
            "UK 8",
            "UK 9",
            "UK 10",
          ].map((item) => (
            <button
              key={item}
              className={`btn btn-sm rounded-0 ${
                size === item ? "btn-dark" : "btn-outline-dark"
              }`}
              style={{ width: 42, fontSize: "0.75rem",whiteSpace: "nowrap", padding:"0.01rem"}}
              onClick={() => {
                if (size === item) {
                  setSize("");
                } else {
                  setSize(item);
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </Section>

      <Section id="price" title="Price">
        {[
          { id: "p1", label: "Under ₹1000", min: "", max: 1000 },
          { id: "p2", label: "₹1000 - ₹2500", min: 1000, max: 2500 },
          { id: "p3", label: "₹2500 - ₹5000", min: 2500, max: 5000 },
          { id: "p4", label: "Above ₹5000", min: 5000, max: "" },
        ].map((p) => (
          <div className="form-check mb-2" key={p.id}>
            <input
              className="form-check-input"
              type="radio"
              name="price"
              checked={selectedPrice === p.id}
              id={p.id}
              onChange={() => {
                setSelectedPrice(p.id);
                setMinPrice(p.min);
                setMaxPrice(p.max);
              }}
            />
            <label className="form-check-label small" htmlFor={p.id}>
              {p.label}
            </label>
          </div>
        ))}
      </Section>
    </>
  );

  return (
    <>
      <button
        className="btn btn-outline-dark btn-sm d-lg-none d-flex align-items-center gap-2 rounded-0 mb-3"
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontal size={14} />
        Filters
      </button>

      <aside
        className="bg-light p-3 p-md-4 border rounded-0 d-none d-lg-block"
        style={{ maxWidth: 280 }}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-1 mb-3">
          <h6
            className="fw-bold mb-0 text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Filters
          </h6>
          <button
            className="btn btn-link btn-sm text-decoration-none p-0 text-muted"
            onClick={() => {
              setCategory("");
              setSize("");
              setMinPrice("");
              setMaxPrice("");
              setSelectedPrice("");
            }}
          >
            Clear All
          </button>
        </div>
        <FilterContent />
      </aside>

      {isOpen && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
            onClick={() => setIsOpen(false)}
          />
          <div
            className="position-fixed top-0 start-0 h-100 bg-white d-lg-none"
            style={{
              width: "85%",
              maxWidth: 320,
              zIndex: 1050,
              overflowY: "auto",
            }}
          >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h6 className="fw-bold mb-0 text-uppercase">Filters</h6>
              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-link btn-sm text-decoration-none p-0 text-muted"
                  onClick={() => {
                    setCategory("");
                    setSize("");
                    setMinPrice("");
                    setMaxPrice("");
                    setSelectedPrice("");
                  }}
                >
                  Clear All
                </button>
                <button
                  className="btn btn-sm p-0 border-0 bg-transparent"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <FilterContent />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterSidebar;
