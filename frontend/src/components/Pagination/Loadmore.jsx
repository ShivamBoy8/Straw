import React from "react";

const LoadMore = ({ onClick }) => {
  return (
    <div className="text-center my-5">
      <button className="btn btn-outline-dark px-5 py-2 rounded-0" onClick={onClick}>
        LOAD MORE
      </button>
    </div>
  );
};

export default LoadMore;