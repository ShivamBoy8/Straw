import { useSelector } from "react-redux";
import { MdMenu } from "react-icons/md";

export default function Header({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth);

  const adminName = user?.name || "Admin";
  const initial = adminName.charAt(0).toUpperCase();

  return (
    <header className="admin-header">
      <div className="d-flex align-items-center gap-2">
        <button
          className="menu-toggle"
          onClick={onMenuClick}
          aria-label="Toggle Sidebar"
        >
          <MdMenu />
        </button>

        <div className="header-title">
          <h5>Admin Panel</h5>
          <small>Manage your store</small>
        </div>
      </div>

      <div className="admin-user">
        <span
          className="d-none d-sm-inline fw-semibold"
          style={{ color: "#1a1f36" }}
        >
          {adminName}
        </span>

        <div className="admin-avatar">
          {initial}
        </div>
      </div>
    </header>
  );
}