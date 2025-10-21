import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products as productsApi, reviews as reviewsApi } from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const placeholder = "https://via.placeholder.com/800x400?text=No+Image";

  const load = async () => {
    try {
      const data = await productsApi.get(id);
      setProduct(data);
    } catch {
      console.error("Failed to fetch product");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const submitReview = async () => {
    try {
      await reviewsApi.create(Number(id), { rating, comment });
      setRating(5);
      setComment("");
      await load();
    } catch {
      alert("Failed to submit review.");
    }
  };

  if (!product) return <div className="text-center py-12 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <img
        src={product.image_url || placeholder}
        alt={product.name}
        className="w-full h-72 object-cover rounded-lg border border-gray-200"
      />

      <h1 className="text-2xl font-bold text-emerald-700 mt-4">
        {product.name}
      </h1>
      <p className="text-gray-600 mt-1">{product.category}</p>
      <p className="text-emerald-600 font-bold mt-2 text-lg">
        ${Number(product.price).toFixed(2)}
      </p>

      <p className="text-gray-700 mt-4">{product.description}</p>

      {product.sustainability_score && (
        <div className="mt-2 bg-emerald-100 text-emerald-700 inline-block px-3 py-1 rounded-full text-sm">
          ♻️ Eco Score: {product.sustainability_score}/10
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
        <div className="flex gap-2 flex-wrap">
          {product.tags?.length ? (
            product.tags.map((t) => (
              <span
                key={t.id}
                className="px-2 py-1 rounded-full bg-gray-100 border text-sm"
              >
                {t.name}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No tags</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-gray-800 mb-3">Reviews</h3>
        {product.reviews?.length ? (
          product.reviews.map((r) => (
            <div
              key={r.id}
              className="border border-gray-100 rounded-lg p-3 mb-2 bg-gray-50"
            >
              <div className="font-medium text-gray-800">Rating: {r.rating}/5</div>
              <p className="text-sm text-gray-700">{r.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>

      <div className="mt-4 border-t pt-4">
        <h4 className="font-semibold mb-2">Add Review</h4>
        <div className="flex gap-2 items-center">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
          />
          <button
            onClick={submitReview}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
