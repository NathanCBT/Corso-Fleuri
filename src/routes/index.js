/**
 * Fichier central pour toutes les routes
 * À importer dans server.js
 */

const express = require('express');
const router = express.Router();

// Importer les routes
// const userRoutes = require('./userRoutes');
// const productRoutes = require('./productRoutes');
// const adminRoutes = require('./adminRoutes');

// Utiliser les routes
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);
// router.use('/admin', adminRoutes);

// Route de test
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

module.exports = router;
