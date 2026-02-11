import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Naksh Jewels
        </Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/cart" className="cart-link">
            Cart
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;