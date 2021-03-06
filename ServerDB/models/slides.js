'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Slides.init({
    imageUrl: DataTypes.TEXT,
    text: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    organizationId: {
      type: DataTypes.INTEGER,
      references: { model: 'Organization', key: 'id' },
      onDelete: 'CASCADE'
    } 
  }, {
    sequelize,
    modelName: 'Slides',
  });
  return Slides;
};