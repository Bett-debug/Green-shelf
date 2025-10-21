import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          🌿 Green Shelf
        </h1>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/tags", label: "Tags" },
            { to: "/recommendations", label: "Recommendations" },
            { to: "/chat", label: "AI Chat" },
          ].map((link) => (
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

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-3">
          <button className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-emerald-600 transition-all">
            Login
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-emerald-600 hover:bg-emerald-100 transition-all">
            Register
          </button>
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
