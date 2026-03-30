// Point d'entrée pour lancer le serveur avec: node server.js
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes (à ajouter)
// app.use('/api/users', require('./src/routes/userRoutes'));
// app.use('/api/products', require('./src/routes/productRoutes'));

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
