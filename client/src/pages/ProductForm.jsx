import React, { useState } from 'react'
export default function ProductForm() {
const [form, setForm] = useState({ name: '', description: '', price: '', category: '', sustainability_score: '', carbon_footprint: '' })
const [loading, setLoading] = useState(false)
const navigate = useNavigate()


function onChange(e) {
const { name, value } = e.target
setForm((s) => ({ ...s, [name]: value }))
}


async function onSubmit(e) {
e.preventDefault()
setLoading(true)
const payload = {
name: form.name,
description: form.description,
price: parseFloat(form.price),
category: form.category || null,
sustainability_score: form.sustainability_score ? parseInt(form.sustainability_score) : null,
carbon_footprint: form.carbon_footprint ? parseFloat(form.carbon_footprint) : null,
}


try {
await api.create(payload)
navigate('/')
} catch (err) {
alert('Failed to create product: ' + err.message)
} finally {
setLoading(false)
}
}


return (
<div className="max-w-xl mx-auto card">
<h2 className="text-xl font-semibold mb-3">Add Product</h2>
<form onSubmit={onSubmit} className="space-y-3">
<div>
<label className="block text-sm mb-1">Name</label>
<input required name="name" value={form.name} onChange={onChange} className="w-full border rounded px-2 py-1" />
</div>


<div>
<label className="block text-sm mb-1">Description</label>
<textarea name="description" value={form.description} onChange={onChange} className="w-full border rounded px-2 py-1" />
</div>


<div>
<label className="block text-sm mb-1">Price</label>
<input required name="price" value={form.price} onChange={onChange} type="number" step="0.01" className="w-full border rounded px-2 py-1" />
</div>


<div className="grid grid-cols-2 gap-2">
<div>
<label className="block text-sm mb-1">Category</label>
<input name="category" value={form.category} onChange={onChange} className="w-full border rounded px-2 py-1" />
</div>


<div>
<label className="block text-sm mb-1">Sustainability Score (1-10)</label>
<input name="sustainability_score" value={form.sustainability_score} onChange={onChange} type="number" min="1" max="10" className="w-full border rounded px-2 py-1" />
</div>
</div>


<div>
<label className="block text-sm mb-1">Carbon footprint (kg CO2)</label>
<input name="carbon_footprint" value={form.carbon_footprint} onChange={onChange} type="number" step="0.1" className="w-full border rounded px-2 py-1" />
</div>


<div className="flex gap-2">
<button disabled={loading} className="bg-green-600 text-white px-3 py-1 rounded">{loading ? 'Saving...' : 'Save'}</button>
<button type="button" onClick={() => window.history.back()} className="px-3 py-1 rounded border">Cancel</button>
</div>
</form>
</div>
)
}