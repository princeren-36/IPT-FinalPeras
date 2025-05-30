import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

const sidebarLinks = [
  { label: "Dashboard", path: "/admin" },
  { label: "Products", path: "/admin/manageproducts" },
  { label: "Users", path: "/admin/manageusers" },
];

function AdminSidebar({ tab, onTabChange, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-brand">
      </div>
      <nav className="admin-navbar-links">
        {sidebarLinks.map((link, idx) => (
          <a
            key={link.path}
            href={link.path}
            className={`admin-navbar-link${tab === idx ? " active" : ""}`}
            onClick={e => {
              e.preventDefault();
              onTabChange && onTabChange(idx);
              navigate(link.path);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button className="admin-navbar-logout" onClick={() => {
        onLogout && onLogout();
        navigate("/"); 
        localStorage.removeItem("user");
        window.location.reload();
      }}>
        Logout
      </button>
    </header>
  );
}

export default AdminSidebar;
