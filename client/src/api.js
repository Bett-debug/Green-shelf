const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const products = {
  list: () => request("/products"),
  get: (id) => request(`/products/${id}`),
  create: (payload) => request("/products", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => request(`/products/${id}`, { method: "DELETE" }),
  recommendations: (id) => request(`/recommendations/${id}`)
};

export const tags = {
  list: () => request("/tags"),
  create: (payload) => request("/tags", { method: "POST", body: JSON.stringify(payload) }),
  remove: (id) => request(`/tags/${id}`, { method: "DELETE" })
};

export const users = {
  list: () => request("/users"),
  get: (id) => request(`/users/${id}`),
  create: (payload) => request("/users", { method: "POST", body: JSON.stringify(payload) })
};

export const reviews = {
  create: (productId, payload) => request(`/products/${productId}/reviews`, { method: "POST", body: JSON.stringify(payload) })
};
