import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-14">
      <h1 className="text-4xl font-extrabold text-brand-700">Green Shelf</h1>
      <p className="mt-4 text-lg text-gray-700">Find and evaluate products that are kinder to the planet.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/products" className="bg-[#4ecdc4] hover:bg-[#ff6b6b] text-white font-semibold px-6 py-2 rounded-2xl shadow-md transition-all">Browse Products</Link>
        <Link to="/add" className="px-6 py-3 border border-brand-500 text-brand-600 rounded-lg">Add Product</Link>
      </div>
    </div>
  );
}
