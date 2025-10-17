import React, { useEffect, useState } from 'react'
import { products as api } from '../api'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'


export default function Home() {
const [items, setItems] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(() => {
fetchProducts()
}, [])


async function fetchProducts() {
setLoading(true)
try {
const data = await api.list()
setItems(data)
} catch (err) {
setError(err.message)
} finally {
setLoading(false)
}
}


async function handleDelete(id) {
if (!confirm('Delete this product?')) return
try {
await api.remove(id)
setItems((s) => s.filter((p) => p.id !== id))
} catch (err) {
alert('Failed to delete: ' + err.message)
}
}


return (
<div>
<div className="flex items-center justify-between mb-4">
<h1 className="text-2xl font-semibold">Products</h1>
<Link to="/products/new" className="text-white bg-green-600 px-3 py-1 rounded">Add product</Link>
</div>


{loading && <div>Loading...</div>}
{error && <div className="text-red-600">{error}</div>}


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{items.map((p) => (
<ProductCard key={p.id} product={p} onDelete={handleDelete} />
))}
</div>
</div>
)
}