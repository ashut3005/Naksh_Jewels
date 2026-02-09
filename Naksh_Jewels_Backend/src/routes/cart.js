const express = require('express');
const router = express.Router();


let cart = [];

router.get('/', (req, res) => {
  try {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      success: true,
      data: cart,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching cart',
      error: error.message
    });
  }
});


router.post('/', (req, res) => {
  try {
    const { productId, quantity, name, price, image, description } = req.body;
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: productId,
        quantity,
        name,
        price,
        image,
        description: description || '',
        addedAt: new Date().toISOString()
      });
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding to cart',
      error: error.message
    });
  }
});


router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    cart[itemIndex].quantity = quantity;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      success: true,
      message: 'Item quantity updated',
      data: cart[itemIndex],
      cart: cart,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating cart',
      error: error.message
    });
  }
});


router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const initialLength = cart.length;
    
    cart = cart.filter(item => item.id !== id);
    
    if (cart.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing from cart',
      error: error.message
    });
  }
});


router.delete('/', (req, res) => {
  try {
    const cartLength = cart.length;
    cart = [];
    
    res.json({
      success: true,
      message: `Cart cleared successfully. Removed ${cartLength} items.`,
      data: [],
      totalItems: 0,
      totalPrice: 0
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Server error clearing cart',
      error: error.message
    });
  }
});

module.exports = router;