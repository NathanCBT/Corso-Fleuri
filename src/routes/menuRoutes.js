/**
 * Routes pour les Menus
 */

const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');

// Routes
router.get('/', MenuController.getAll);
router.get('/:id', MenuController.getById);
router.get('/type/:type', MenuController.getByType);
router.post('/', MenuController.create);

module.exports = router;
