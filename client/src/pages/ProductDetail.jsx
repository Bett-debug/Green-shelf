import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products as productsApi } from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  if (!product) return <div className="text-center py-12 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      
      {/* Product Image */}
      <img
        src={product.image_url || placeholder}
        alt={product.name}
        className="w-full h-72 object-cover rounded-lg border border-gray-200"
      />

      {/* Product Info */}
      <h1 className="text-3xl font-bold text-emerald-700 mt-6">
        {product.name}
      </h1>
      <p className="text-gray-600 text-sm mt-1">{product.category}</p>
      <p className="text-emerald-600 font-bold mt-3 text-lg">
        Ksh {Number(product.price)}
      </p>

      <p className="text-gray-700 mt-4">{product.description}</p>

      {product.sustainability_score && (
        <div className="mt-3 bg-emerald-100 text-emerald-700 inline-block px-3 py-1 rounded-full text-sm">
          ♻️ Eco Score: {product.sustainability_score}/10
        </div>
      )}

      {/* Tags */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
        <div className="flex gap-2 flex-wrap">
          {product.tags?.length ? (
            product.tags.map((t) => (
              <span
                key={t.id}
                className="px-3 py-1 rounded-full bg-gray-100 border text-sm text-gray-700"
              >
                {t.name}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No tags listed</p>
          )}
        </div>
      </div>

      {/* Buy Button */}
      {product.store_url ? (
        <a
          href={product.store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-8 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition"
        >
           Buy on Store
        </a>
      ) : (
        <p className="mt-8 text-sm text-gray-500 italic">
          Store link not available — contact support for purchase.
        </p>
      )}

    </div>
  );
};

export default ProductDetail;
