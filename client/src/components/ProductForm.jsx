import React, { useState } from "react";

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

      {/* Image Upload */}
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

      {/* Text Fields */}
      {[
        { name: "name", type: "text", placeholder: "Product Name", required: true },
        { name: "description", type: "text", placeholder: "Description" },
        { name: "price", type: "number", placeholder: "Price ($)", required: true },
        { name: "category", type: "text", placeholder: "Category" },
        { name: "sustainability_score", type: "number", placeholder: "Sustainability Score (1–10)" },
        { name: "carbon_footprint", type: "number", placeholder: "Carbon Footprint (kg CO₂)" },
      ].map((field) => (
        <input
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          required={field.required}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-emerald-200 outline-none"
        />
      ))}

      {/* Save Button */}
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
