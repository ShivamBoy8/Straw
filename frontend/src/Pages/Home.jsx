import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaTruck,
  FaBoxOpen,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import Gazu2 from "../assets/Gazu2.jpeg";

const Home = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2">
        <div className="container d-flex justify-content-between small">
          <span>FREE DELIVERY ON ORDERS ABOVE ₹999</span>

          <div className="d-flex gap-4">
            <span>DOWNLOAD APP</span>
            <span>TRACK ORDER</span>
            <span>HELP</span>
          </div>
        </div>
      </div>

      {/* Navbar */}

      <nav className="navbar navbar-expand-lg bg-white py-4 border-bottom">
        <div className="container">

          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">MEN</li>
            <li className="nav-item">WOMEN</li>
            <li className="nav-item">KIDS</li>
            <li className="nav-item">BEAUTY</li>
          </ul>

          <h1 className="fw-bold display-6">GAZU</h1>

          <div className="d-flex gap-4 align-items-center">
            <FaSearch />
            <FaUser />
            <FaHeart />
            <FaShoppingBag />
          </div>

        </div>
      </nav>

      {/* Hero */}

      <section className="container py-5">

        <div className="row align-items-center">

          <div className="col-md-3">

            <p className="text-uppercase fw-semibold">
              Fashion
              <br />
              That Moves
              <br />
              With You
            </p>

          </div>

          <div className="col-md-6 position-relative text-center">

            <h1
              className="display-1 fw-bold text-dark"
              style={{
                fontSize: "10rem",
                letterSpacing: "12px",
              }}
            >
              GAZU
            </h1>

             <img src="assets/Gazu2.jpeg" alt="Gazu"></img>

            <div
              className="position-absolute top-50 start-50 translate-middle bg-secondary-subtle border"
              style={{
                width: "300px",
                height: "500px",
              }}
            ></div>

          </div>

          <div className="col-md-3 text-end">

            <h6 className="text-uppercase">
              New
              <br />
              Collection
              <br />
              2024
            </h6>

          </div>

        </div>

        <div className="mt-5 d-flex gap-3">

          <button className="btn btn-dark px-4">
            Shop Now
          </button>

          <button className="btn btn-outline-dark px-4">
            Explore New In
          </button>

        </div>

      </section>

      {/* Categories */}

      <section className="bg-black py-5">

        <div className="container">

          <div className="row g-4">

            {/* Men */}

            <div className="col-md-4">

              <div className="d-flex gap-3 text-white align-items-center">

                <div
                  className="bg-secondary"
                  style={{
                    width: "100px",
                    height: "120px",
                  }}
                ></div>

                <div>

                  <h4>MEN</h4>

                  <p className="small">
                    Elevated everyday essentials.
                  </p>

                  <a href="#" className="text-white">
                    SHOP MEN →
                  </a>

                </div>

              </div>

            </div>

            {/* Women */}

            <div className="col-md-4">

              <div className="d-flex gap-3 text-white align-items-center">

                <div
                  className="bg-secondary"
                  style={{
                    width: "100px",
                    height: "120px",
                  }}
                ></div>

                <div>

                  <h4>WOMEN</h4>

                  <p className="small">
                    Effortless style for every you.
                  </p>

                  <a href="#" className="text-white">
                    SHOP WOMEN →
                  </a>

                </div>

              </div>

            </div>

            {/* Kids */}

            <div className="col-md-4">

              <div className="d-flex gap-3 text-white align-items-center">

                <div
                  className="bg-secondary"
                  style={{
                    width: "100px",
                    height: "120px",
                  }}
                ></div>

                <div>

                  <h4>KIDS</h4>

                  <p className="small">
                    Comfort meets cool everyday.
                  </p>

                  <a href="#" className="text-white">
                    SHOP KIDS →
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* New Season */}

      <section className="container py-5">

        <div className="row align-items-center">

          <div className="col-md-5">

            <h6 className="text-uppercase">
              New Season
            </h6>

            <h1 className="display-2 fw-bold">
              NEW
              <br />
              VIBES
            </h1>

            <p>
              Discover everything new and now.
            </p>

            <button className="btn btn-dark px-4">
              Explore Collection
            </button>

          </div>

          <div className="col-md-7 text-center">

            <div
              className="bg-secondary-subtle border mx-auto"
              style={{
                width: "400px",
                height: "500px",
              }}
            ></div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="border-top py-5">

        <div className="container">

          <div className="row text-center g-4">

            <div className="col-md-3">
              <FaTruck size={35} />
              <h6 className="mt-3">FAST DELIVERY</h6>
              <small>Quick & safe delivery</small>
            </div>

            <div className="col-md-3">
              <FaBoxOpen size={35} />
              <h6 className="mt-3">EASY RETURNS</h6>
              <small>Within 15 days</small>
            </div>

            <div className="col-md-3">
              <FaShieldAlt size={35} />
              <h6 className="mt-3">QUALITY ASSURED</h6>
              <small>Best fashion, best quality</small>
            </div>

            <div className="col-md-3">
              <FaLock size={35} />
              <h6 className="mt-3">SECURE PAYMENT</h6>
              <small>100% secure checkout</small>
            </div>

          </div>

        </div>

      </section>

    </>
  );
};

export default Home;