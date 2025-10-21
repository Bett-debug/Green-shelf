import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Tags from "./pages/Tags";
import Recommendations from "./pages/Recommendations";
import UserPage from "./pages/UserPage";
import AIChatPage from "./pages/AIChatPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          
          <Navbar />

          
          <main className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/chat" element={<AIChatPage />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes - Admin Only */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AddProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <EditProduct />
                  </ProtectedRoute>
                }
              />
              
              {/* Protected Routes - Any Authenticated User */}
              <Route
                path="/users/:id"
                element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          
          <Footer />

          
          <AIChatbot />
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
