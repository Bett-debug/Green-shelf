import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Recommendations from "./pages/Recommendations";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <Router>
      <ProductProvider>
        <div className="min-h-screen bg-gradient-to-br from-[#ffe66d] via-[#fdf6f0] to-[#4ecdc4] text-[#1a1a1a]">
          <Navbar />
          <main className="max-w-6xl mx-auto px-6 py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
          </main>
        </div>
      </ProductProvider>
    </Router>
  );
};

export default App;
