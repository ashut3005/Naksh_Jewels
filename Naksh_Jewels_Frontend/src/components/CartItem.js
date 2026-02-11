import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>{item.description || 'No description available'}</p>
        <div className="item-price">₹{item.price.toLocaleString()}</div>
      </div>
      <div className="item-quantity">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>
      <div className="item-total">
        ₹{(item.price * item.quantity).toLocaleString()}
      </div>
      <button 
        className="btn-remove"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;