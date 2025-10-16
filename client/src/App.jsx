import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import ProductForm from './pages/ProductForm'
import Header from './components/Header'


export default function App() {
return (
<div className="min-h-screen bg-gray-50">
<Header />
<main className="container mx-auto p-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/products/new" element={<ProductForm />} />
<Route path="/products/:id" element={<ProductDetails />} />
</Routes>
</main>
</div>
)
}