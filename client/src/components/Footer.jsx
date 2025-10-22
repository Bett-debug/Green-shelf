import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-emerald-700">Green Shelf</span> • All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
