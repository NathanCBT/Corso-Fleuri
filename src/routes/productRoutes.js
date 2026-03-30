/**
 * Routes pour les Produits
 */

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Routes
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.get('/type/:type', ProductController.getByType);
router.get('/category/:category', ProductController.getByCategory);
router.post('/', ProductController.create);

module.exports = router;
