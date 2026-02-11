import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, getTotalPrice, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
        <a href="/" className="btn">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{getTotalPrice().toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>₹{getTotalPrice().toLocaleString()}</span>
        </div>
        <button className="btn btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;