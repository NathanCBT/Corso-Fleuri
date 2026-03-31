const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const articleRoutes = require('./articleRoutes');
const commandeRoutes = require('./commandeRoutes');
const menuRoutes = require('./menuRoutes');

router.use('/user', userRoutes);
router.use('/article', articleRoutes);
router.use('/order', commandeRoutes);
router.use('/menu', menuRoutes);

// Route de test / santé du serveur
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Route API info
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Corso-Fleuri API',
    version: '1.0.0',
    endpoints: {
      user: '/api/user',
      article: '/api/article',
      order: '/api/order',
      menu: '/api/menu',
      health: '/api/health'
    }
  });
});

module.exports = router;
