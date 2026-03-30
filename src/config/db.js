// ============================================
// ⚠️ BASE DE DONNÉES DÉSACTIVÉE
// ============================================
// Utiliser le fichier mockData.js à la place
// ============================================

/*
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,             //connection occupées
  connectionLimit: 20,                  //nombre de connection max
});

const db = pool.promise();

module.exports = db;
*/

// ============================================
// DONNÉES MOCK - À REMPLACER PAR UNE VRAIE BD
// ============================================

module.exports = {
  query: async () => {
    // Stub pour compatibilité
    return [[]];
  }
};
