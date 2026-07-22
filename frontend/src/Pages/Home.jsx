import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Css/Home.css";

import heroImage from "../assets/assetsfooter/Gazu2.jpeg";
import Men from "../assets/assetsfooter/Gazu3.jpeg";
import Women from "../assets/assetsfooter/Gazu4.jpeg";
import Kids from "../assets/assetsfooter/Gazu5.jpeg";
import bannerImage from "../assets/assetsfooter/Gazu1.jpeg";

const GazuHomePage = () => {
  return (
    <div className="gazu-homepage">
      <div className="top-bar bg-black text-white py-1 px-4 d-flex justify-content-between align-items-center">
        <span className="top-bar-text">FREE DELIVERY ON ORDERS ABOVE ₹1999</span>
        <div className="top-bar-links d-flex gap-3">
          <a href="#download" className="text-white text-decoration-none">DOWNLOAD APP</a>
          
          <a href="#track" className="text-white text-decoration-none">TRACK ORDER</a>
          
          <a href="#help" className="text-white text-decoration-none">HELP</a>
        </div>
      </div>

      <header className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-4 py-3">
        <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-4 fw-medium text-uppercase nav-links">
            <a href="#men" className="nav-link-item">MEN</a>
            <a href="#women" className="nav-link-item">WOMEN</a>
            <a href="#kids" className="nav-link-item">KIDS</a>
            <a href="#beauty" className="nav-link-item">BEAUTY</a>
          </div>

          <div className="brand-logo h1 fw-bold mb-0 text-center">GAZU</div>

          <div className="d-flex gap-4 align-items-center header-icons">
            <a href="#search" className="text-dark text-decoration-none">🔍 SEARCH</a>
            <a href="#login" className="text-dark text-decoration-none">👤 LOGIN</a>
            <a href="#wishlist" className="text-dark text-decoration-none">♡ WISHLIST</a>
            <a href="#cart" className="text-dark text-decoration-none">🛍️ CART ()</a>
          </div>
        </div>
      </header>

      <section className="hero-section position-relative bg-light overflow-hidden">
        <div className="container-fluid p-0 position-relative">
          <div className="hero-graphic-wrapper w-90 text-center">
            <img 
              src={heroImage} 
              alt="GAZU Hero Collection" 
              className="hero-full-img img-fluid"
            />
          </div>

          <div className="hero-bottom-controls position-absolute bottom-0 start-0 end-0 p-4 d-flex justify-content-between align-items-end">
            <div className="d-flex gap-3 align-items-center ms-md-3 mb-md-2">
              <button className="btn btn-dark px-4 py-2 rounded-0 fw-semibold text-uppercase left-10px">
                SHOP NOW
              </button>
              <button className="btn btn-outline-dark px-4 py-2 rounded-0 fw-semibold text-uppercase left-10px">
                EXPLORE NEW IN
              </button>
            </div>

            <div className="text-end me-md-3 mb-md-2">
              <p className="text-uppercase small fw-bold mb-1 tracking-wider">
                NEW<br />COLLECTION<br />2024
              </p>
              <div className="line-bar bg-dark ms-auto"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-5 px-4">
        <div className="container-fluid">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center gap-3 p-3 border border-secondary rounded-0">
                <img src={Men} alt="Men" className="category-img object-fit-cover" />
                <div>
                  <h5 className="fw-bold text-uppercase mb-1">MEN</h5>
                  <p className="small text-white mb-2">Elevated everyday essentials.</p>
                  <a href="#shop-men" className="text-white text-uppercase small text-decoration-none fw-semibold">
                    SHOP MEN &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center gap-3 p-3 border border-secondary rounded-0">
                <img src={Women} alt="Women" className="category-img object-fit-cover" />
                <div>
                  <h5 className="fw-bold text-uppercase mb-1">WOMEN</h5>
                  <p className="small  mb-2 text-white">Effortless style for every you.</p>
                  <a href="#shop-women" className="text-white text-uppercase small text-decoration-none fw-semibold">
                    SHOP WOMEN &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center gap-3 p-3 border border-secondary rounded-0">
                <img src={Kids} alt="Kids" className="category-img object-fit-cover" />
                <div>
                  <h5 className="fw-bold text-uppercase mb-1">KIDS</h5>
                  <p className="small  mb-2 text-white">Comfort meets cool everyday.</p>
                  <a href="#shop-kids" className="text-white text-uppercase small text-decoration-none fw-semibold">
                    SHOP KIDS &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5 px-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-md-5 ps-md-5 mb-4 mb-md-0">
              <span className="text-uppercase small tracking-wider text-muted fw-bold">NEW SEASON</span>
              <h1 className="display-3 fw-bold text-uppercase my-2 lh-1">NEW<br />VIBES</h1>
              <p className="text-muted mb-4">Discover everything<br />new and now.</p>
              <button className="btn btn-dark px-4 py-2 rounded-0 text-uppercase fw-semibold">
                EXPLORE COLLECTION
              </button>
            </div>

            <div className="col-12 col-md-7">
              <img 
                src={bannerImage} 
                alt="New Season Banner" 
                className="banner-img img-fluid object-fit-cover w-100" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-top border-bottom py-4 bg-white px-4">
        <div className="container-fluid">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fs-4">🚚</span>
                <div className="text-start">
                  <h6 className="fw-bold mb-0 text-uppercase small">FAST DELIVERY</h6>
                  <p className="text-muted small mb-0">Quick & safe delivery</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fs-4">📦</span>
                <div className="text-start">
                  <h6 className="fw-bold mb-0 text-uppercase small">EASY RETURNS</h6>
                  <p className="text-muted small mb-0">Within 15 days</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fs-4">🛡️</span>
                <div className="text-start">
                  <h6 className="fw-bold mb-0 text-uppercase small">QUALITY ASSURED</h6>
                  <p className="text-muted small mb-0">Best fashion, best quality</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fs-4">🔒</span>
                <div className="text-start">
                  <h6 className="fw-bold mb-0 text-uppercase small">SECURE PAYMENT</h6>
                  <p className="text-muted small mb-0">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GazuHomePage;