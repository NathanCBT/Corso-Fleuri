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
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  QuantityMin: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  hot: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
}, {
  tableName: 'article',
  timestamps: false,
});

module.exports = Article;
