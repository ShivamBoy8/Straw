import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdInventory2, MdReceiptLong, MdStorefront } from "react-icons/md";

/**
 * Sidebar
 * Fixed left navigation for the Admin Panel (see admin.css — the
 * sidebar is `position: fixed` on every breakpoint, so it never
 * scrolls with the page; only its visibility toggles on mobile).
 *
 * Props:
 * - isOpen (bool): controls visibility on mobile/tablet (<992px)
 * - onClose (func): called when a link is clicked or the backdrop
 *   is tapped, so the sidebar can close on mobile after navigation
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    // `end` is required here — without it, NavLink treats "/admin" as a
    // prefix match, so it would also light up on "/admin/products" and
    // "/admin/orders" at the same time as their own links.
    { to: "/admin", label: "Dashboard", icon: <MdDashboard />, end: true },
    { to: "/admin/products", label: "Products", icon: <MdInventory2 /> },
    { to: "/admin/orders", label: "Orders", icon: <MdReceiptLong /> },
  ];

  return (
    <>
      {/* Backdrop shown only on mobile when sidebar is open */}
      {isOpen && <div className="sidebar-backdrop d-lg-none" onClick={onClose}></div>}

      <aside className={`admin-sidebar ${isOpen ? "show" : ""}`}>
        <div className="brand">
          <span className="brand-badge">
            <MdStorefront />
          </span>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/" className="nav-link" onClick={onClose}>
            <MdStorefront />
            <span>Back to Store</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;