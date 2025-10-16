import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
return (
<header className="bg-white shadow">
<div className="container mx-auto p-4 flex items-center justify-between">
<Link to="/" className="text-2xl font-bold text-green-700">Sustainable Shelf</Link>
<nav>
<Link to="/" className="mr-4 text-gray-700">Home</Link>
<Link to="/products/new" className="text-white bg-green-600 px-3 py-1 rounded">Add Product</Link>
</nav>
</div>
</header>
)
}