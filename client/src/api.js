const API_URL = import.meta.env.VITE_API_URL || "https://green-shelf-xqb9.onrender.com";

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { "Content-Type": "application/json" };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${API_URL}${path}`, {
    headers,
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

export const auth = {
  register: (payload) => request("/users/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/users/login", { method: "POST", body: JSON.stringify(payload) }),
  getCurrentUser: () => request("/users/me")
};

export const users = {
  list: () => request("/users"),
  get: (id) => request(`/users/${id}`),
  create: (payload) => request("/users", { method: "POST", body: JSON.stringify(payload) })
};

export const reviews = {
  create: (productId, payload) => request(`/products/${productId}/reviews`, { method: "POST", body: JSON.stringify(payload) })
};
