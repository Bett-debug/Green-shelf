import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await addProduct(data);
    navigate('/products');
  };

  return <ProductForm onSubmit={handleSubmit} />;
}
