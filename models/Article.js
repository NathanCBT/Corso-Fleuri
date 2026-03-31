const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  IdCategory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  Stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  QuantityMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Hot: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'article',
  timestamps: false,
});

module.exports = Article;
