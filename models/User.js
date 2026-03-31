const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  IdUnique: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Rule: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
