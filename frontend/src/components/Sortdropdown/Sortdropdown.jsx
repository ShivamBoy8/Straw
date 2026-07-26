import React from "react";

const SortDropdown = ({ sort, setSort }) => {
  const sortLabels = {
    "-createdAt": "Newest",
    price: "Price: Low to High",
    "-price": "Price: High to Low",
  };
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-dark dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {sortLabels[sort]}
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button
            className="dropdown-item"
            onClick={() => setSort("-createdAt")}
          >
            Newest
          </button>
        </li>

        <li>
          <button className="dropdown-item" onClick={() => setSort("price")}>
            Price: Low to High
          </button>
        </li>

        <li>
          <button className="dropdown-item" onClick={() => setSort("-price")}>
            Price: High to Low
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SortDropdown;
