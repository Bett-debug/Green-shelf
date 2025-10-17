import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/add">Add Product</Link>
  </nav>
);

export default Navbar;
