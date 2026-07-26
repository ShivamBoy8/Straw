import { FiSearch } from "react-icons/fi";
import "./Searchbar.css";

const Searchbar = ({ search, setSearch }) => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-11">
          <div className="d-flex">
            <div className="input-group search-box">
              <input
                type="search"
                className="form-control search-input"
                placeholder="Search products..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button className="btn search-btn" type="button">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
