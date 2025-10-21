// src/context/ProductContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { products as productsApi } from "../api";

export const ProductContext = createContext({
  products: [],
  add: async (p) => {},
  deleteProduct: async (id) => {},
  refresh: async () => {},
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  async function refresh() {
    try {
      const list = await productsApi.list();
      setProducts(list || []);
    } catch (e) {
      console.error("Failed to load products from API, falling back to empty list.", e);
      setProducts([]);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  async function add(product) {
    // try to create via API, otherwise update local state
    try {
      if (productsApi.create) {
        const created = await productsApi.create(product);
        await refresh();
        return created;
      }
    } catch (e) {
      console.error("API create failed", e);
    }
    // fallback: add locally with temporary id
    const id = Date.now();
    setProducts((p) => [{ ...product, id }, ...p]);
    return { ...product, id };
  }

  async function update(id, data) {
    try {
      if (productsApi.update) {
        const updated = await productsApi.update(id, data);
        await refresh();
        return updated;
      }
    } catch (e) {
      console.error("API update failed", e);
    }
    setProducts((p) => p.map((it) => (String(it.id) === String(id) ? { ...it, ...data } : it)));
  }

  async function deleteProduct(id) {
    try {
      if (productsApi.delete) {
        await productsApi.delete(id);
        await refresh();
        return;
      }
    } catch (e) {
      console.error("API delete failed", e);
    }
    setProducts((p) => p.filter((it) => String(it.id) !== String(id)));
  }

  return (
    <ProductContext.Provider value={{ products, add, update, deleteProduct, refresh }}>
      {children}
    </ProductContext.Provider>
  );
}
