'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entry.hasOne(models.Category, {as: 'category'})
    }
  };
  Entry.init({
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.TEXT,
    type: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Entry',
    paranoid: true
  });
  return Entry;
};