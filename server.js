require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route racine
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue sur Corso-Fleuri API',
    version: '1.0.0',
    documentation: '/api'
  });
});

// Routes
app.use('/api', routes);

// Middleware d'erreur global
app.use(errorHandler);

// Tester la connexion à la base de données et démarrer le serveur
db.sequelize.authenticate().then(() => {
  console.log('✅ Connexion à la base de données réussie');
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
}).catch(err => {
  console.error('❌ Erreur de connexion à la base de données:', err);
  process.exit(1);
});

module.exports = app;
