

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error(data.message);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      
      const mockProducts = [
        {
          id: 1,
          name: "Diamond Necklace",
          price: 29999,
          image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
          description: "Elegant diamond necklace with 18k gold"
        },
      ];
      setProducts(mockProducts);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list">
      <h1>Naksh Jewels Collection</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;