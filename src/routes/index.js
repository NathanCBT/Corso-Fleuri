/**
 * Fichier central pour toutes les routes
 * À importer dans server.js
 */

const express = require('express');
const router = express.Router();

// Importer les routes
const productRoutes = require('./productRoutes');
const menuRoutes = require('./menuRoutes');
const commandeRoutes = require('./commandeRoutes');
const userRoutes = require('./userRoutes');

// Utiliser les routes
router.use('/products', productRoutes);
router.use('/menus', menuRoutes);
router.use('/commandes', commandeRoutes);
router.use('/users', userRoutes);

// Route de test / santé du serveur
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route API info
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Corso-Fleuri API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      menus: '/api/menus',
      commandes: '/api/commandes',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

module.exports = router;
