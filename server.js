// Point d'entrée pour lancer le serveur avec: node server.js
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// ============================================
// Middlewares
// ============================================

// Parsing JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// Routes API
// ============================================

const apiRoutes = require('./src/routes/index');
app.use('/api', apiRoutes);

// Servir les pages HTML statiques (pages client-side)
app.use('/pages', express.static(path.join(__dirname, 'src/pages')));

// ============================================
// Route racine
// ============================================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue sur Corso-Fleuri API',
    version: '1.0.0',
    documentation: '/api'
  });
});

// ============================================
// Gestion des erreurs 404
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// ============================================
// Démarrer le serveur
// ============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🍕 CORSO-FLEURI API                   ║
║  Server running on port ${PORT}              ║
║  Environment: ${process.env.NODE_ENV || 'development'}         ║
╚════════════════════════════════════════╝
  `);
  console.log(`📍 Available at: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});
