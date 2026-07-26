import {
  FaAward,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";
import "./Footer.css";

const features = [
  {
    icon: <FaAward />,
    title: "Quality Assured",
    text: "Premium fabrics and finest craftsmanship.",
  },
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    text: "Quick and reliable shipping across India.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Shopping",
    text: "100% secure payments and checkout.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    text: "We're always here to help you.",
  },
];

const Footer = () => {
  return (
    <footer className="footer">

      {/* Upper Footer */}

      <section className="footerTop">

        <div className="container">

          <div className="row align-items-center gy-5">

            <div className="col-lg-5 text-center text-lg-start">

              <h1 className="brandLogo">
                VELOUR
              </h1>

              <div className="mobileLine"></div>

            </div>

            <div className="col-lg-1 d-none d-lg-flex justify-content-center">

              <div className="verticalDivider"></div>

            </div>

            <div className="col-lg-6 text-center text-lg-start">

              <h4 className="brandTitle">
                Timeless Style. Modern Edge.
              </h4>

              <p className="brandDesc">
                Elevated essentials and statement pieces crafted
                for every moment.
              </p>

            </div>

          </div>

          <hr className="sectionDivider" />

          <div className="row g-4">

            {features.map((item) => (

              <div
                key={item.title}
                className="col-md-6 col-lg-3"
              >

                <div className="featureCard">

                  <div className="featureCircle">

                    {item.icon}

                  </div>

                  <h5>{item.title}</h5>

                  <p>{item.text}</p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Bottom Footer */}

      <section className="footerBottom">

        <div className="container">

          <div className="footerDivider">

            <div></div>

            <span></span>

            <div></div>

          </div>

          <h4>
            Proudly Designed For The Modern You.
          </h4>

          <p>
            © 2026 VELOUR. All Rights Reserved.
          </p>

        </div>

      </section>

    </footer>
  );
};

export default Footer;