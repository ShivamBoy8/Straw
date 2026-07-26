import React from "react";

const SIZE_OPTIONS = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "UK 6",
  "UK 7",
  "UK 8",
  "UK 9",
  "UK 10",
];

export default function ProductForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">

        <h4 className="fw-bold mb-4">
          Product Information
        </h4>

        {/* Title */}

        <div className="mb-3">
          <label className="form-label">Title</label>

          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}

        <div className="mb-3">
          <label className="form-label">Description</label>

          <textarea
            rows={5}
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Brand + Category */}

        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>

            <input
              type="text"
              className="form-control"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>

            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>

        </div>

        {/* Sub Category */}

        <div className="mb-3">
          <label className="form-label">
            Sub Category
          </label>

          <input
            type="text"
            className="form-control"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
          />
        </div>

        {/* Pricing */}

        <div className="row">

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Price
            </label>

            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Discount Price
            </label>

            <input
              type="number"
              className="form-control"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Stock
            </label>

            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Sizes */}

        <div className="mb-4">

          <label className="form-label fw-semibold">
            Available Sizes
          </label>

          <div className="row">

            {SIZE_OPTIONS.map((size) => (

              <div
                key={size}
                className="col-6 col-md-3 mb-2"
              >
                <div className="form-check">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.sizes.includes(size)}
                    onChange={() =>
                      handleSizeChange(size)
                    }
                  />

                  <label className="form-check-label">
                    {size}
                  </label>

                </div>
              </div>

            ))}

          </div>

        </div>

        {/* Colors */}

        <div className="mb-4">

          <label className="form-label">
            Colors
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Black, White, Blue"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
          />

          <div className="form-text">
            Separate colors using commas.
          </div>

        </div>

        {/* Featured */}

        <div className="form-check">

          <input
            className="form-check-input"
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />

          <label className="form-check-label">
            Featured Product
          </label>

        </div>

      </div>
    </div>
  );
}