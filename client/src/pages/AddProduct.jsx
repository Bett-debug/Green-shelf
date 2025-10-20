import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { tags as tagsApi } from "../api";
import { ProductContext } from "../context/ProductContext";

export default function AddProduct() {
  const { add } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", sustainability_score: "", carbon_footprint: "", tag_ids: [] });
  const [allTags, setAllTags] = useState([]);

  useEffect(() => { tagsApi.list().then(setAllTags).catch(() => {}); }, []);

  function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  function toggleTag(id) {
    setForm((s) => ({ ...s, tag_ids: s.tag_ids.includes(id) ? s.tag_ids.filter(t => t !== id) : [...s.tag_ids, id] }));
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await add({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category || null,
        sustainability_score: form.sustainability_score ? parseInt(form.sustainability_score) : null,
        carbon_footprint: form.carbon_footprint ? parseFloat(form.carbon_footprint) : null,
        tag_ids: form.tag_ids
      });
      navigate("/products");
    } catch (err) {
      alert("Failed to add product");
    }
  }

  return (
    <div className="max-w-2xl mx-auto card">
      <h2 className="text-xl font-semibold mb-3">Add Product</h2>
      <form onSubmit={submit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border rounded px-3 py-2" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="w-full border rounded px-3 py-2" required />
        <div className="grid grid-cols-2 gap-2">
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border rounded px-3 py-2" />
          <input name="sustainability_score" value={form.sustainability_score} onChange={handleChange} placeholder="Score (1-10)" type="number" min="1" max="10" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Tags</div>
          <div className="flex gap-2 flex-wrap">
            {allTags.map(t => (
              <button key={t.id} type="button" onClick={() => toggleTag(t.id)} className={`px-3 py-1 rounded-full border ${form.tag_ids.includes(t.id) ? 'bg-brand-200 border-brand-400' : ''}`}>{t.name}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-brand-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => history.back()} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </div>
  );
}
