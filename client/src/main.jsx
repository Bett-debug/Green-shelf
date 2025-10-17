// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App'
// import './App.css'


// createRoot(document.getElementById('root')).render(
// <React.StrictMode>
// <BrowserRouter>
// <App />
// </BrowserRouter>
// </React.StrictMode>
// )



import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductProvider>
      <App />
    </ProductProvider>
  </BrowserRouter>
);
