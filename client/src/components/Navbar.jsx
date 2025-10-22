import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define navigation links based on role
  const getNavLinks = () => {
    // Admin navigation - focused on management
    if (isAdmin()) {
      return [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/products", label: "Products" },
        { to: "/add", label: "Add Product" },
        { to: "/tags", label: "Tags" },
      ];
    }

    // Shopper navigation - focused on shopping experience
    return [
      { to: "/", label: "Home" },
      { to: "/products", label: "Shop" },
      { to: "/tags", label: "Categories" },
      { to: "/recommendations", label: "Recommendations" },
      { to: "/chat", label: "AI Assistant" },
    ];
  };

  return (
    <nav className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <NavLink to="/" className="text-2xl font-extrabold tracking-wide hover:text-emerald-100 transition-colors">
          🌿 Green Shelf
        </NavLink>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          {getNavLinks().map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `transition-all duration-200 ${
                    isActive
                      ? "border-b-2 border-white pb-1"
                      : "hover:border-b-2 hover:border-white pb-1"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated() ? (
            <>
              {/* User Info */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-700 rounded-lg">
                <span className="text-sm font-medium">{user?.username}</span>
                <span className="text-xs bg-emerald-800 px-2 py-0.5 rounded">
                  {user?.role}
                </span>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-emerald-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-emerald-600 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 rounded-lg bg-white text-emerald-600 hover:bg-emerald-100 transition-all"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search Bar Below Navbar */}
      <div className="bg-emerald-500 py-3 shadow-inner">
        <div className="max-w-3xl mx-auto px-4">
          <input
            type="text"
            placeholder="Search across Green Shelf..."
            className="w-full px-4 py-2 rounded-lg border border-transparent focus:border-white focus:ring-2 focus:ring-emerald-200 outline-none text-emerald-900"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
