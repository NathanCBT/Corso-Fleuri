const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderMenu = sequelize.define('OrderMenu', {
  IdOrder: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  IdMenu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'ordermenu',
  timestamps: false,
});

module.exports = OrderMenu;
