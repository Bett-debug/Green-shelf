import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format'


export default function ProductCard({ product, onDelete }) {
return (
<div className="card">
<div className="flex justify-between items-start">
<div>
<h3 className="text-lg font-semibold">{product.name}</h3>
<p className="text-sm text-gray-600">{product.category}</p>
</div>
<div className="text-right">
<div className="text-sm text-gray-500">{product.sustainability_score ? `Score: ${product.sustainability_score}/10` : 'Not rated'}</div>
<div className="text-lg font-medium">{formatCurrency(product.price)}</div>
</div>
</div>


<p className="mt-3 text-gray-700 text-sm">{product.description}</p>


<div className="mt-4 flex gap-2">
<Link to={`/products/${product.id}`} className="px-3 py-1 rounded border text-sm">View</Link>
<button onClick={() => onDelete(product.id)} className="px-3 py-1 rounded border text-sm text-red-600">Delete</button>
</div>
</div>
)
}