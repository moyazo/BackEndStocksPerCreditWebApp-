'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    goal: DataTypes.STRING,
    min_invest: DataTypes.INTEGER,
    action_per_credit: DataTypes.STRING,
    currency: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    history: DataTypes.STRING,
    proposal: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    comerce: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};