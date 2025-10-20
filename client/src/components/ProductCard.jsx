import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const placeholder = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition transform hover:-translate-y-1 p-4">
      
      <img
        src={product.image_url || placeholder}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        {product.sustainability_score && (
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
            ♻️ {product.sustainability_score}/10
          </span>
        )}
      </div>

      
      {product.price && (
        <p className="text-emerald-600 font-bold mt-1">
          Ksh {Number(product.price).toFixed(2)}
        </p>
      )}

      
      {product.description && (
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>
      )}

      
      <Link
        to={`/products/${product.id}`}
        className="mt-4 block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
