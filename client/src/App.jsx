import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Tags from "./pages/Tags";
import Recommendations from "./pages/Recommendations";
import UserPage from "./pages/UserPage";
import AIChatPage from "./pages/AIChatPage";

import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <ProductProvider>
      <Router>
        
        <Navbar />

        
        <main className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/chat" element={<AIChatPage />} />
          </Routes>
        </main>

        
        <Footer />

        
        <AIChatbot />
      </Router>
    </ProductProvider>
  );
};

export default App;
