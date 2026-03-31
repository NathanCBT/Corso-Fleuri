const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commande = sequelize.define('Commande', {
  IdOrder: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Seller: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  tableName: 'commande',
  timestamps: false,
});

module.exports = Commande;
