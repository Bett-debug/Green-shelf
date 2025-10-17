const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'


async function request(path, options = {}) {
const res = await fetch(`${API_URL}${path}`, {
headers: { 'Content-Type': 'application/json' },
...options,
})
if (!res.ok) {
const text = await res.text()
throw new Error(text || res.statusText)
}
if (res.status === 204) return null
return res.json()
}


export const products = {
list: () => request('/products'),
get: (id) => request(`/products/${id}`),
create: (payload) => request('/products', { method: 'POST', body: JSON.stringify(payload) }),
update: (id, payload) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
remove: (id) => request(`/products/${id}`, { method: 'DELETE' }),
recommendations: (id) => request(`/recommendations/${id}`),
}
