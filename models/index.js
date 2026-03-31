const sequelize = require('../config/database');
const User = require('./User');
const Article = require('./Article');
const Category = require('./Category');
const Commande = require('./Commande');
const Menu = require('./Menu');
const ArticleMenu = require('./ArticleMenu');
const OrderArticle = require('./OrderArticle');
const OrderMenu = require('./OrderMenu');

const db = {
  sequelize,
  User,
  Article,
  Category,
  Commande,
  Menu,
  ArticleMenu,
  OrderArticle,
  OrderMenu,
};

// Exporter les modèles pour déstructuration directe
module.exports = {
  ...db,
  db,
};
