'use strict'
const { Model } = require('sequelize')
const { UserRole } = require('../common/constants')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Project, {
        through: 'User_Favorites_Projects',
        as: 'favoriteProjects',
        foreignKey: 'userId',
      })
      User.belongsToMany(models.Project, {
        through: 'User_Investing_Projects',
        as: 'investingProjects',
        foreignKey: 'userId',
      })
      User.belongsToMany(models.Tag_Group, {
        through: 'Investor_Tag_Group',
        as: 'InvestorGroupTag',
        foreignKey: 'userId',
      })
    }
  }
  User.init(
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
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userRol: {
        type: DataTypes.ENUM(Object.keys(UserRole)),
        allowNull: false,
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
      modelName: 'User',
    }
  )
  return User
}
