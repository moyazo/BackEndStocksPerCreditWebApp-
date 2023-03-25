'use strict'
const { Model } = require('sequelize')
const { currency } = require('../common/constants')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsToMany(models.User, {
        through: 'User_Favorites_Projects',
        as: 'favoriteProjects',
        foreignKey: 'projectId',
      })
      Project.belongsToMany(models.User, {
        through: 'User_Investing_Projects',
        as: 'investingProjects',
        foreignKey: 'projectId',
      })
      Project.belongsToMany(models.Tag, {
        through: 'Project_Tags',
        as: 'ProjectTag',
        foreignKey: 'projectId',
      })
      Project.belongsTo(models.User, { foreignKey: 'userId' }); 
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minInvest: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalInvest: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      actionPerCredit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.ENUM(Object.keys(currency)),
        allowNull: false,
      },
      duration: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      history: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      proposal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commerce: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  )
  return Project
}
