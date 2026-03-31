const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Menu = sequelize.define('Menu', {
  IdMenu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  tableName: 'menu',
  timestamps: false,
});

module.exports = Menu;
