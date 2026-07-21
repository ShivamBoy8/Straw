import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiChevronRight,
} from "react-icons/fi";

import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    "MEN",
    "WOMEN",
    "KIDS",
    "BEAUTY",
    "ACCOUNT",
    "WISHLIST",
    "CART",
  ];

  return (
    <>
      {/* Announcement Bar */}

      <div className="topBar">

        <div className="topLeft">
          🚚 FREE DELIVERY ON ORDERS ABOVE ₹999
        </div>

        <div className="topRight">
          <span>DOWNLOAD APP</span>
          <span>TRACK ORDER</span>
          <span>HELP</span>
        </div>

      </div>

      {/* Desktop Navbar */}

      <nav className="navbar">

        <div className="navLeft">

          <a className="active">MEN</a>
          <a>WOMEN</a>
          <a>KIDS</a>

        </div>

        <div className="logo">
          GAZU
        </div>

        <div className="navRight">

          <div>
            <FiSearch />
            <span>SEARCH</span>
          </div>

          <div>
            <FiUser />
            <span>LOGIN</span>
          </div>

          <div>
            <FiHeart />
            <span>WISHLIST</span>
          </div>

          <div>
            <FiShoppingBag />
            <span>CART (0)</span>
          </div>

        </div>

      </nav>

      {/* Mobile Header */}

      <div className="mobileNavbar">

        <button
          className="menuBtn"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>

        <div className="mobileLogo">
          GAZU
        </div>

        <div className="mobileIcons">

          <FiSearch />

          <FiUser />

          <div className="cartIcon">

            <FiShoppingBag />

            <span>0</span>

          </div>

        </div>

      </div>

      {/* Overlay */}

      <div
        className={`overlay ${menuOpen ? "showOverlay" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Drawer */}

      <div className={`mobileMenu ${menuOpen ? "showMenu" : ""}`}>

        <div className="drawerHeader">

          <button
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>

          <div className="drawerLogo">
            GAZU
          </div>

          <div className="drawerIcons">

            <FiSearch />
            <FiUser />

            <div className="cartIcon">

              <FiShoppingBag />

              <span>0</span>

            </div>

          </div>

        </div>

        {menuItems.map((item) => (

          <div
            className="drawerItem"
            key={item}
          >

            <span>{item}</span>

            <FiChevronRight />

          </div>

        ))}

      </div>
    </>
  );
}