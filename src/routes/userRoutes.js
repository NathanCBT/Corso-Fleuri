/**
 * Example Routes - Définition des routes Express
 * 
 * Utilise: Controllers pour traiter les requêtes
 */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Routes
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);

module.exports = router;
