const API_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/api${path}`, {
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
