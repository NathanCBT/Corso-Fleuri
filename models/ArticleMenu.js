const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ArticleMenu = sequelize.define('ArticleMenu', {
  IdArticle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  IdMenu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'articlemenu',
  timestamps: false,
});

module.exports = ArticleMenu;
