import React, { useEffect, useState } from "react";
import FilterSidebar from "../../components/Filtersidebar/Filtersidebar";
import SortDropdown from "../../components/Sortdropdown/Sortdropdown";
import Productgrid from "../../components/ProductCard/Productgrid";
import LoadMore from "../../components/Pagination/Loadmore";
import api from "../../api/axios";
import Searchbar from "../../components/Searchbar/Searchbar";
import productNotFound from "../../assets/icons/productnotfound.jpeg";
import { useSearchParams } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [sort, setSort] = useState("-createdAt");
  const [category, setCategory] = useState(
  searchParams.get("category") || ""
);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [size, setSize] = useState("");

  const getProducts = async () => {
    try {
      if (page === 1) {
        setLoading(true);
      }

      const response = await api.get("/products", {
        params: {
          search: debouncedSearch,
          sort,
          category,
          minPrice,
          maxPrice,
          page,
          limit: 8,
          size,
        },
      });

      if (page === 1) {
        setProducts(response.data.products);
      } else {
        setProducts((prev) => [...prev, ...response.data.products]);
      }

      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.totalProducts);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Unable to load products. Please try again.");
    } finally {
      if (page === 1) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [debouncedSearch, sort, category, minPrice, maxPrice, page, size]);

  useEffect(() => {
    console.log("size" + size);
    setPage(1);
  }, [debouncedSearch, sort, category, minPrice, maxPrice, size]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
  const urlCategory = searchParams.get("category") || "";
  setCategory(urlCategory);
}, [searchParams]);

  return (
    <div className="container-fluid ">
      <div className="row">
        <Searchbar search={search} setSearch={setSearch} />
      </div>

      <div className="row">
        <div className="col-lg-2">
          <FilterSidebar
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            size={size}
            setSize={setSize}
          />
        </div>

        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="mb-1">All Products</h3>
              <p className="text-muted mb-0">
                Showing {products.length} of {totalProducts} products
              </p>
            </div>

            <SortDropdown sort={sort} setSort={setSort} />
          </div>

          {loading ? (
            <h4 className="text-center my-5">Loading products...</h4>
          ) : error ? (
            <div className="alert alert-secondary">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <img
                src={productNotFound}
                alt="No products found"
                className="img-fluid mb-3"
                style={{ maxWidth: "280px" }}
              />

              <h4 className="fw-semibold">No Products Found</h4>

              <p className="text-muted mb-0">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              <Productgrid products={products} />

              {page < totalPages && (
                <LoadMore onClick={() => setPage((prev) => prev + 1)} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
