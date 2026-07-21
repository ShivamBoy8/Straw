import {
  FaAward,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";
import "../css/Footer.css";
const Footer = () => {
  return (
    <footer>

      <section className="bg-white py-5">
        <div className="container">

          
          <div className="row align-items-center text-center text-lg-start mb-5 ">
            <div className="col-lg-5 gazu-logo">
              <h1
        className="fw-bold m-0"
          style={{
          fontSize: "72px",
        letterSpacing: "16px",
        fontFamily: "Georgia, serif",
      }}>
                GAZU
              </h1>
               <div className="mobile-line"></div>
            </div>
              
            <div className="col-lg-1 d-none d-lg-flex justify-content-center">
              <div
                style={{
                  width: "1px",
                  height: "100px",
                  background: "#ddd",
                }}
              ></div>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <h5
  className="fw-semibold text-uppercase"
  style={{
    letterSpacing: "5px",
    fontSize: "18px",
  }}
>
  Timeless Style. Modern Edge.
</h5>
              <p className="text-secondary fs-4 mt-3">
                Elevated essentials and statement pieces crafted for every
                moment.
              </p>
            </div>
          </div>

          <hr className="mb-5" />

          
          <div className="row text-center">

            <div className="col-md-6 col-lg-3 mb-4">
              <div className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: 80, height: 80 }}>
                <FaAward size={32} className="feature-icon"/>
              </div>

              <h5 className="fw-bold text-uppercase">
                Quality Assured
              </h5>

              <p className="text-secondary">
                Premium fabrics and finest craftsmanship.
              </p>
            </div>

            <div className="col-md-6 col-lg-3 mb-4 border-lg-start">
              <div className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: 80, height: 80 }}>
                <FaTruck size={32} className="feature-icon" />
              </div>

              <h5 className="fw-bold text-uppercase">
                Fast & Reliable
              </h5>

              <p className="text-secondary">
                Quick delivery, every time.
              </p>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: 80, height: 80 }}>
                <FaShieldAlt size={32} className="feature-icon" />
              </div>

              <h5 className="fw-bold text-uppercase">
                Secure Shopping
              </h5>

              <p className="text-secondary">
                Safe payments and secure checkout.
              </p>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center mb-3"
                style={{ width: 80, height: 80 }}>
                <FaHeadset size={32} className="feature-icon" />
              </div>

              <h5 className="fw-bold text-uppercase">
                Customer First
              </h5>

              <p className="text-secondary">
                Here for you, always.
              </p>
            </div>

          </div>
        </div>
      </section>

     
      <section className="bg-dark text-white py-5">
        <div className="container text-center">

          <div className="d-flex justify-content-center align-items-center mb-4">
            <div
              style={{
                width: "180px",
                height: "1px",
                background: "#777",
              }}
            ></div>

            <div
              className="mx-3 rounded-circle bg-secondary"
              style={{
                width: "8px",
                height: "8px",
              }}
            ></div>

            <div
              style={{
                width: "180px",
                height: "1px",
                background: "#777",
              }}
            ></div>
          </div>

          <h4
            className="text-uppercase mb-4"
            style={{ letterSpacing: "4px" }}
          >
            Proudly Designed For The Modern You.
          </h4>

          <div
            className="mx-auto mb-4"
            style={{
              width: "70px",
              height: "1px",
              background: "#777",
            }}
          ></div>

          <p className="mb-0 fs-5 text-light">
            © 2026 GAZU. ALL RIGHTS RESERVED.
          </p>

        </div>
      </section>
    </footer>
  );
};

export default Footer;