const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const { validateCartItem, validateCartUpdate } = require('./middleware/validation');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:80',
    'http://frontend:80',
    'http://frontend:3000',
    'http://localhost:5000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  next();
});


app.use('/api/products', productRoutes);
app.use('/api/cart', validateCartItem, cartRoutes);
app.put('/api/cart/:id', validateCartUpdate, (req, res, next) => { 
  next();
});


app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Naksh Jewels Backend API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      health: '/health'
    }
  });
});


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Naksh Jewels Backend API',
    documentation: {
      products: 'GET /api/products - Get all products',
      singleProduct: 'GET /api/products/:id - Get single product',
      getCart: 'GET /api/cart - Get cart items',
      addToCart: 'POST /api/cart - Add item to cart',
      updateCart: 'PUT /api/cart/:id - Update item quantity',
      removeFromCart: 'DELETE /api/cart/:id - Remove item from cart',
      clearCart: 'DELETE /api/cart - Clear entire cart',
      healthCheck: 'GET /health - Health check endpoint'
    },
    status: 'operational'
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
    suggestion: 'Check / endpoint for available routes'
  });
});


app.use((err, req, res, next) => {
 
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;