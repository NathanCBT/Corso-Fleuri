const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  IdUnique: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Rule: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = User;
