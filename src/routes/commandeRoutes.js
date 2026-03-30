/**
 * Routes pour les Commandes
 */

const express = require('express');
const router = express.Router();
const CommandeController = require('../controllers/commandeController');

// Routes
router.get('/', CommandeController.getAll);
router.get('/stats', CommandeController.getStats);
router.get('/:id', CommandeController.getById);
router.get('/client/:client', CommandeController.getByClient);
router.get('/state/:etat', CommandeController.getByState);
router.post('/', CommandeController.create);
router.put('/:id/state', CommandeController.updateState);

module.exports = router;
