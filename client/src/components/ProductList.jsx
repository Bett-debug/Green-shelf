import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ProductList = () => {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <div>
      <h2>All Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          <Link to={`/products/${p.id}`}>{p.name}</Link>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
          <Link to={`/edit/${p.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
