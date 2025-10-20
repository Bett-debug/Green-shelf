import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#ff6b6b] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-md">
          🌿 Green Shelf
        </h1>
        <ul className="flex space-x-6 font-semibold">
          <li>
            <Link
              to="/"
              className="hover:text-[#ffe66d] transition-all duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-[#ffe66d] transition-all duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/add-product"
              className="hover:text-[#ffe66d] transition-all duration-200"
            >
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"
              className="hover:text-[#ffe66d] transition-all duration-200"
            >
              AI Tips
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
