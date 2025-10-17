import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    sustainability_score: initialData.sustainability_score || '',
    carbon_footprint: initialData.carbon_footprint || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          name={key}
          value={formData[key]}
          placeholder={key.replace('_', ' ')}
          onChange={handleChange}
          required={key === 'name' || key === 'price'}
        />
      ))}
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
