const express = require('express');

const authenticate = require('./middlewares/authenticate');

const authorise = require('./middlewares/authorise');

const { register, login } = require('./controllers/auth.controller.js');

const {
  getProduct,
  createProduct,
  editProduct,
} = require('./controllers/product.controller.js');

const router = express.Router();

router.get(
  '/getproduct',
  authenticate,
  authorise(['admin', 'manager']),
  getProduct
);

router.post(
  '/createproduct',
  authenticate,
  authorise(['admin']),
  createProduct
);

router.patch(
  '/product/:id',
  authenticate,
  authorise(['admin', 'manager']),
  editProduct
);

router.post('/register', register);

router.post('/login', login);

module.exports = router;
