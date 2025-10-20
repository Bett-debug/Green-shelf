import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-l-4 border-[#ff6b6b] p-6 hover:scale-105 hover:shadow-xl transition-all">
      <h2 className="text-xl font-bold text-[#ff6b6b] mb-2">{product.name}</h2>
      <p className="text-[#1a1a1a] mb-2">{product.description}</p>
      <span className="text-[#4ecdc4] font-semibold">
        ${product.price.toFixed(2)}
      </span>
    </div>
  );
};

export default ProductCard;
