'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFavoritesProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserFavoritesProjects.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
          model: 'User',
          key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    project_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: 'Project',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'UserFavoritesProjects',
  });
  return UserFavoritesProjects;
};