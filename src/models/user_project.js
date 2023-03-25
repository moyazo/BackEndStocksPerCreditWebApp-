'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Project.init({
    userId: DataTypes.UUID,
    projectId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'User_Project',
  });
  return User_Project;
};