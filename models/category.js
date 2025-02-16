// models/category.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize DB 연결

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // 고유 ID
    autoIncrement: true, // 자동 증가
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // 카테고리 이름은 반드시 있어야 함
  },
}, {
  sequelize,
  modelName: 'Category', // 모델 이름
  tableName: 'categories', // 실제 DB 테이블 이름
  timestamps: false, // created_at, updated_at을 자동으로 추가하지 않음
});

module.exports = Category;
