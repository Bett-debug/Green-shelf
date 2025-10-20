import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products as productsApi, tags as tagsApi } from "../api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    if (!id) return;
    productsApi.get(id).then(p => setForm({ ...p, price: String(p.price), sustainability_score: p.sustainability_score ? String(p.sustainability_score) : "", carbon_footprint: p.carbon_footprint ? String(p.carbon_footprint) : "", tag_ids: p.tags.map(t => t.id) })).catch(() => navigate("/products"));
    tagsApi.list().then(setAllTags).catch(() => {});
  }, [id]);

  function onChange(e) { const { name, value } = e.target; setForm(f => ({ ...f, [name]: value })); }

  function toggleTag(tagId) { setForm(f => ({ ...f, tag_ids: f.tag_ids.includes(tagId) ? f.tag_ids.filter(t => t !== tagId) : [...f.tag_ids, tagId] })); }

  async function submit(e) {
    e.preventDefault();
    try {
      await productsApi.update(id, {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        sustainability_score: form.sustainability_score ? parseInt(form.sustainability_score) : null,
        carbon_footprint: form.carbon_footprint ? parseFloat(form.carbon_footprint) : null,
        tag_ids: form.tag_ids
      });
      navigate("/products");
    } catch (err) { alert("Failed to update"); }
  }

  if (!form) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto card">
      <h2 className="text-xl font-semibold mb-3">Edit Product</h2>
      <form onSubmit={submit} className="space-y-3">
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="w-full border rounded px-3 py-2" required />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" className="w-full border rounded px-3 py-2" />
        <input name="price" value={form.price} onChange={onChange} placeholder="Price" type="number" step="0.01" className="w-full border rounded px-3 py-2" required />
        <div className="grid grid-cols-2 gap-2">
          <input name="category" value={form.category} onChange={onChange} placeholder="Category" className="w-full border rounded px-3 py-2" />
          <input name="sustainability_score" value={form.sustainability_score} onChange={onChange} placeholder="Score (1-10)" type="number" min="1" max="10" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Tags</div>
          <div className="flex gap-2 flex-wrap">
            {allTags.map(t => (
              <button type="button" key={t.id} onClick={() => toggleTag(t.id)} className={`px-3 py-1 rounded-full border ${form.tag_ids.includes(t.id) ? 'bg-brand-200 border-brand-400' : ''}`}>{t.name}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-brand-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </div>
  );
}
