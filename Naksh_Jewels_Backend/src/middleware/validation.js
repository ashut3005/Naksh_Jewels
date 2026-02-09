const Joi = require('joi');


const productSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  image: Joi.string().uri().required(),
  description: Joi.string().max(500).required(),
  category: Joi.string().max(50)
});

const cartItemSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().min(1).max(10).required(),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  image: Joi.string().uri().required(),
  description: Joi.string().max(500).optional()
});


const cartUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1).max(10).required()
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.details[0].message
    });
  }
  next();
};

const validateCartItem = (req, res, next) => {
  const { error } = cartItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.details[0].message
    });
  }
  next();
};


const validateCartUpdate = (req, res, next) => {
  const { error } = cartUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateProduct,
  validateCartItem,
  validateCartUpdate
};