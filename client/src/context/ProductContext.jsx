import React, { createContext, useState, useEffect } from "react";
import { products as api } from "../api";

export const ProductContext = createContext({
  products: [],
  reload: async () => {},
  add: async () => {},
  update: async () => {},
  remove: async () => {}
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  async function reload() {
    try {
      const data = await api.list();
      setProducts(data);
    } catch (e) {
      console.error("Failed to load products", e);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function add(payload) {
    await api.create(payload);
    await reload();
  }

  async function update(id, payload) {
    await api.update(id, payload);
    await reload();
  }

  async function remove(id) {
    await api.remove(id);
    setProducts((s) => s.filter((p) => p.id !== id));
  }

  return (
    <ProductContext.Provider value={{ products, reload, add, update, remove }}>
      {children}
    </ProductContext.Provider>
  );
}
