import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import { products as productsApi } from "../api";

const EditProduct = () => {
  const { id } = useParams();
  const { update } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    productsApi
      .get(id)
      .then((data) => setProduct(data))
      .catch(() => navigate("/products"));
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      await update(id, formData);
      navigate("/products");
    } catch {
      alert("Failed to update product.");
    }
  };

  if (!product) return <div className="text-center py-12 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        Edit Product
      </h2>
      <ProductForm onSubmit={handleUpdate} initialData={product} />
    </div>
  );
};

export default EditProduct;
