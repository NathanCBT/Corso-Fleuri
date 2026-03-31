const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'category',
  timestamps: false,
});

module.exports = Category;
