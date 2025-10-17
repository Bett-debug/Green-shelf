import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products as api } from '../api'
import Modal from '../components/Modal'


export default function ProductDetails() {
const { id } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [recs, setRecs] = useState([])
const [showRecs, setShowRecs] = useState(false)
const navigate = useNavigate()


useEffect(() => {
fetchProduct()
}, [id])


async function fetchProduct() {
setLoading(true)
try {
const data = await api.get(id)
setProduct(data)
} catch (err) {
alert('Failed to load product: ' + err.message)
navigate('/')
} finally {
setLoading(false)
}
}


async function handleRecs() {
try {
const data = await api.recommendations(id)
// data assumed to be an array of strings
setRecs(Array.isArray(data) ? data : [String(data)])
setShowRecs(true)
} catch (err) {
alert('Failed to get recommendations: ' + err.message)
}
}


if (loading) return <div>Loading...</div>


return (
<div className="max-w-3xl mx-auto card">
<div className="flex justify-between items-start">
<div>
<h1 className="text-2xl font-semibold">{product.name}</h1>
<p className="text-sm text-gray-600">{product.category}</p>
</div>
<div className="text-right">
<div className="text-sm">{product.sustainability_score ? `Score: ${product.sustainability_score}/10` : 'Not rated'}</div>
</div>
</div>


<p className="mt-4">{product.description}</p>


<div className="mt-4 text-sm text-gray-600">Carbon footprint: {product.carbon_footprint ?? 'Unknown'} kg CO2</div>


<div className="mt-6 flex gap-2">
<button onClick={handleRecs} className="px-3 py-1 rounded bg-blue-600 text-white">Get Recommendations</button>
<button onClick={() => navigate('/')} className="px-3 py-1 rounded border">Back</button>
</div>


<Modal open={showRecs} onClose={() => setShowRecs(false)} title={`Recommendations for ${product.name}`}>
{recs.length ? (
<ul className="list-disc ml-5">
{recs.map((r, i) => <li key={i} className="mb-2">{r}</li>)}
</ul>
) : (
<div>No recommendations available.</div>
)}
</Modal>
</div>
)
}