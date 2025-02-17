// models/menu.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category'); // Category 모델을 불러옴

class Menu extends Model {}

Menu.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, // 카테고리 모델과 연결
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Menu',
  tableName: 'menus',
  timestamps: false,
});

module.exports = Menu;
