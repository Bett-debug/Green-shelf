import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";

const AddProduct = () => {
  const { add } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      await add({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        sustainability_score: formData.sustainability_score
          ? parseInt(formData.sustainability_score)
          : null,
        carbon_footprint: formData.carbon_footprint
          ? parseFloat(formData.carbon_footprint)
          : null,
        image_url:
          typeof formData.image_url === "string"
            ? formData.image_url
            : URL.createObjectURL(formData.image_url),
      });
      navigate("/products");
    } catch (err) {
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        Add New Product
      </h2>

      <ProductForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddProduct;
