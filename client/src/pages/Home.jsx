import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h1 className="text-5xl font-extrabold text-emerald-700 leading-tight">
            Shop Smart. <br /> Shop <span className="text-emerald-500">Green.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-md">
            Discover eco-friendly and sustainable products that help protect the planet
            — because every small choice makes a big difference.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition"
            >
              Browse Products
            </Link>
            <Link
              to="/add"
              className="px-6 py-3 border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 font-medium transition"
            >
              Add Product
            </Link>
          </div>
        </div>

        
        <div className="hidden md:block">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <img
              src="https://via.placeholder.com/700x420?text=Eco+Products"
              alt="Eco-friendly shopping"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
