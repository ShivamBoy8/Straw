import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiChevronRight,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Navbar.css";
import { resetCart } from "../../features/cart/cartSlice";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const items = cart?.items ?? [];

  const cartCount = (items ?? []).reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const navItems = ["MEN", "WOMEN", "KIDS"];

  const drawerItems = isAuthenticated
    ? [
        ...navItems,
        "PROFILE",
        "ORDERS",
        ...(user?.role === "admin" ? ["ADMIN"] : []),
        "LOGOUT",
      ]
    : [...navItems, "LOGIN"];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(resetCart());

    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navLeft">
          {navItems.map((item) => (
            <button
              key={item}
              className={`navLink ${
                location.pathname === `/${item.toLowerCase()}` ? "active" : ""
              }`}
              onClick={() => {
                navigate(`/${item.toLowerCase()}`);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          VELOUR
        </div>

        <div className="navRight">
          <button onClick={() => navigate("/products")}>
            <FiSearch />
            <span>SEARCH</span>
          </button>

          {isAuthenticated ? (
            <div className="dropdown">
              <button
                className="btn dropdown-toggle userDropdown"
                data-bs-toggle="dropdown"
              >
                <FiUser />
                <span>{user?.name?.split(" ")[0]}</span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    Edit Profile
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/orders")}
                  >
                    My Orders
                  </button>
                </li>

                {user?.role === "admin" && (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/admin")}
                    >
                      Admin Panel
                    </button>
                  </li>
                )}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>
              <FiUser />
              <span>LOGIN</span>
            </button>
          )}

          <div className="cartIcon" onClick={() => navigate("/cart")}>
            <span>CART </span>
            <FiShoppingBag />
            <span>{cartCount}</span>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}

      <header className="mobileNavbar">
        <button className="iconBtn" onClick={() => setMenuOpen(true)}>
          <FiMenu />
        </button>

        <div
          className="mobileLogo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          VELOUR
        </div>

        <div className="mobileIcons">
          <FiSearch onClick={() => navigate("/products")} />
          {isAuthenticated ? (
            <FiUser
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            />
          ) : (
            <FiUser
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            />
          )}

          <div className="cartIcon" onClick={() => navigate("/cart")}>
            <FiShoppingBag />
            <span>{cartCount}</span>
          </div>
        </div>
      </header>

      {/* Overlay */}

      <div
        className={`overlay ${menuOpen ? "showOverlay" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}

      <aside className={`mobileMenu ${menuOpen ? "showMenu" : ""}`}>
        <div className="drawerHeader">
          <button className="iconBtn" onClick={() => setMenuOpen(false)}>
            <FiX />
          </button>
        </div>

        {drawerItems.map((item) => (
          <button
            key={item}
            className={`drawerItem ${
              location.pathname === `/${item.toLowerCase()}` ? "active" : ""
            }`}
            onClick={() => {
              setMenuOpen(false);

              switch (item) {
                case "MEN":
                  navigate("/men");
                  break;

                case "WOMEN":
                  navigate("/women");
                  break;

                case "KIDS":
                  navigate("/kids");
                  break;

                case "LOGIN":
                  navigate("/login");
                  break;

                case "PROFILE":
                  navigate("/profile");
                  break;

                case "ORDERS":
                  navigate("/orders");
                  break;

                case "LOGOUT":
                  handleLogout();
                  break;

                case "ADMIN":
                  navigate("/admin");
                  break;

                default:
                  navigate("/");
                  break;
              }
            }}
          >
            <span>{item}</span>

            <FiChevronRight />
          </button>
        ))}
      </aside>
    </>
  );
}