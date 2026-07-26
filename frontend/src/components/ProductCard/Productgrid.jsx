import React from "react";
import ProductCard from "./ProductCard";

const Productgrid = ({products}) => {
  return (
    <div className="container my-5">
      <div className="row g-4">
        {products.map((product) => (
          <div key={product._id} className="col-6 col-md-4 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productgrid;
