import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products as api, reviews as reviewsApi } from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  async function load() {
    try {
      const p = await api.get(id);
      setProduct(p);
    } catch (e) { console.error(e); }
  }

  useEffect(() => { load(); }, [id]);

  async function submitReview() {
    try {
      await reviewsApi.create(Number(id), { rating, comment });
      setComment("");
      setRating(5);
      await load();
    } catch (e) { alert("Failed to add review"); }
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto card">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-sm text-gray-600">{product.category}</p>
        </div>
        <div className="text-right">
          <div className="text-sm">{product.sustainability_score ? `Score: ${product.sustainability_score}/10` : "Not rated"}</div>
          <Link to={`/recommendations/${product.id}`} className="mt-2 inline-block text-sm text-brand-700">Get AI Recommendations</Link>
        </div>
      </div>

      <p className="mt-4">{product.description}</p>

      <div className="mt-4 text-sm text-gray-600">Carbon footprint: {product.carbon_footprint ?? "Unknown"} kg CO₂</div>

      <div className="mt-6">
        <h3 className="font-semibold">Tags</h3>
        <div className="flex gap-2 mt-2">
          {product.tags.map((t) => <span key={t.id} className="px-2 py-1 rounded-full border text-sm">{t.name}</span>)}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Reviews</h3>
        <div className="mt-2">
          {product.reviews.length === 0 && <div className="text-sm text-gray-500">No reviews yet</div>}
          {product.reviews.map(r => (
            <div key={r.id} className="border rounded p-2 mb-2">
              <div className="font-semibold">Rating: {r.rating}/5</div>
              <div className="text-sm">{r.comment}</div>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <h4 className="font-semibold">Add review</h4>
          <div className="flex gap-2 items-center mt-2">
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border px-2 py-1 rounded">
              {[5,4,3,2,1].map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <input value={comment} onChange={e => setComment(e.target.value)} className="border px-3 py-1 flex-1 rounded" placeholder="Comment (optional)" />
            <button onClick={submitReview} className="bg-brand-500 text-white px-3 py-1 rounded">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
