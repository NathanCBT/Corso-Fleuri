const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderArticle = sequelize.define('OrderArticle', {
  IdOrder: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  IdArticle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'orderarticle',
  timestamps: false,
});

module.exports = OrderArticle;
