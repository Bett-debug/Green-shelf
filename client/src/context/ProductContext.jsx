import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const baseUrl = "http://127.0.0.1:5000/api/products";

  const fetchProducts = async () => {
    const res = await fetch(baseUrl);
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async (product) => {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (res.ok) fetchProducts();
  };

  const updateProduct = async (id, updated) => {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
