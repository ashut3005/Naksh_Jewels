import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  const fetchCartFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCart(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
  
      const savedCart = localStorage.getItem('nakshCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  };

  const addToCart = async (product) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        localStorage.setItem('nakshCart', JSON.stringify(data.data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      fallbackAddToCart(product);
    } finally {
      setLoading(false);
    }
  };

  const fallbackAddToCart = (product) => {
    const savedCart = localStorage.getItem('nakshCart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItem = currentCart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...currentCart, { 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1 
      }];
    }
    
    setCart(newCart);
    localStorage.setItem('nakshCart', JSON.stringify(newCart));
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        localStorage.setItem('nakshCart', JSON.stringify(data.data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      
      fallbackRemoveFromCart(productId);
    }
  };

  const fallbackRemoveFromCart = (productId) => {
    const savedCart = localStorage.getItem('nakshCart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    const newCart = currentCart.filter(item => item.id !== productId);
    
    setCart(newCart);
    localStorage.setItem('nakshCart', JSON.stringify(newCart));
  };

  const updateQuantity = async (productId, quantity) => {
    console.log('updateQuantity called with:', productId, quantity);
    
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          
          setCart(data.cart || data.data);
          localStorage.setItem('nakshCart', JSON.stringify(data.cart || data.data));
        }
      } else {
        
        console.log('PUT failed, using local update');
        fallbackUpdateQuantity(productId, quantity);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      
      fallbackUpdateQuantity(productId, quantity);
    }
  };

  const fallbackUpdateQuantity = (productId, quantity) => {
    const savedCart = localStorage.getItem('nakshCart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    const newCart = currentCart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    
    setCart(newCart);
    localStorage.setItem('nakshCart', JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
      });

      if (response.ok) {
        setCart([]);
        localStorage.removeItem('nakshCart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getCartCount,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};