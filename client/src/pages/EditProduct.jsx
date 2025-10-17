import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { products, updateProduct } = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Loading...</p>;

  const handleSubmit = async (data) => {
    await updateProduct(id, data);
    navigate('/products');
  };

  return <ProductForm onSubmit={handleSubmit} initialData={product} />;
}
