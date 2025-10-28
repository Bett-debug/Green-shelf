import React, { useState } from "react";
import { PRODUCT_CATEGORIES } from "../utils/constants";

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category: initialData.category || "",
    sustainability_score: initialData.sustainability_score || "",
    carbon_footprint: initialData.carbon_footprint || "",
    image_url: initialData.image_url || "",
  });

  const [imagePreview, setImagePreview] = useState(initialData.image_url || "");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_url" && files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({ ...formData, image_url: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-emerald-700 mb-3">Product Details</h2>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          name="image_url"
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-200"
          />
        )}
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name *
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-emerald-200 outline-none"
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-emerald-200 outline-none"
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (Ksh) *
        </label>
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-emerald-200 outline-none"
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-emerald-200 outline-none"
        >
          <option value="">Select a category</option>
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sustainability Score (1-10)
        </label>
        <input
          name="sustainability_score"
          type="number"
          min="1"
          max="10"
          placeholder="Rate 1-10"
          value={formData.sustainability_score}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-emerald-200 outline-none"
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Carbon Footprint (kg CO₂)
        </label>
        <input
          name="carbon_footprint"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.carbon_footprint}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-emerald-200 outline-none"
        />
      </div>

      
      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition"
      >
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
