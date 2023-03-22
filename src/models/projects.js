'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsToMany(models.User,{
        through: 'User_Favorites_Projects',
        as: 'favoriteProjects',
        foreignKey: 'project_id'
      })
      Project.belongsToMany(models.User,{
        through: 'User_Investing_Projects',
        as: 'investingProjects',
        foreignKey: 'project_id'
      })
       // N:M CON TAG -> Project_Tag
    }
  }
  Project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_invest: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action_per_credit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    history: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proposal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commerce: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Project',
  });
  return Project;
};