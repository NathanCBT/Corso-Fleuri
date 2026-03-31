const sequelize = require('../config/database');
const User = require('./User');
const Article = require('./Article');
const Commande = require('./Commande');
const Menu = require('./Menu');

const db = {
  sequelize,
  User,
  Article,
  Commande,
  Menu,
};

module.exports = db;
