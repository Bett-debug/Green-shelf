import React, { useEffect, useState } from "react";
import { tags as tagsApi } from "../api";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => { tagsApi.list().then(setTags).catch(() => {}); }, []);

  async function create() {
    if (!name.trim()) return;
    try {
      const t = await tagsApi.create({ name });
      setTags(s => [...s, t]);
      setName("");
    } catch (e) { alert("Failed to create tag"); }
  }

  async function remove(id) {
    if (!confirm("Delete tag?")) return;
    try { await tagsApi.remove(id); setTags(s => s.filter(t => t.id !== id)); } catch { alert("Failed to delete"); }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tags</h2>
      <div className="mb-4 flex gap-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New tag name" className="border px-3 py-2 rounded" />
        <button onClick={create} className="bg-brand-500 text-white px-4 py-2 rounded">Create</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tags.map(t => (
          <div key={t.id} className="card flex items-center justify-between">
            <div>{t.name}</div>
            <div><button onClick={() => remove(t.id)} className="text-red-600">Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
