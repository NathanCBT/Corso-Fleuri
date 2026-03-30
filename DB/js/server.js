const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();

app.get('/test', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM user');
    const [articles] = await db.query('SELECT * FROM article');
    const [menus] = await db.query('SELECT * FROM menu');
    const [orders] = await db.query('SELECT * FROM `order`'); 

    res.json({ 
      message: 'Connexion réussie', 
      database: {
        users: users,
        articles: articles,
        menus: menus,
        orders: orders,                    
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des données', 
      details: err.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});