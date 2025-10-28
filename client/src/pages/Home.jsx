import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-green-200">
        
        <div>
          <h1 className="text-5xl font-extrabold text-emerald-700 leading-tight">
            Shop Smart. <br /> Shop <span className="text-emerald-500">Green.</span>
          </h1>
          <p className="mt-4 text-lg text-black max-w-md">
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
            
          </div>
        </div>

        
        <div className="hidden md:block">
          <div className="bg-green-100 rounded-xl p-6 shadow-sm border border-gray-100">
            <img
              src="https://plus.unsplash.com/premium_photo-1675127366598-f6c344e5233b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1116"
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
