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
      Project.belongsTo(models.User, { foreignKey: 'userId' })
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
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      duration: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      totalInvest: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalInvestor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      history: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      commerce: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      proposal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.ENUM(Object.keys(currency)),
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minimuminvestment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      actionPerCredit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ReturnOnInvestment: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: 'Project',
    }
  )
  return Project
}
