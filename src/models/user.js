'use strict'
const { Model } = require('sequelize')
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
        foreignKey: 'user_id',
      })
      User.belongsToMany(models.Project, {
        through: 'User_Investing_Projects',
        as: 'investingProjects',
        foreignKey: 'user_id',
      })
      User.belongsToMany(models.Tag_Group, {
        through: 'Investor_Tag_Group',
        as: 'InvestorGroupTag',
        foreignKey: 'user_id',
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
        autoIncrement: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
      },
      telf: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.STRING,
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
