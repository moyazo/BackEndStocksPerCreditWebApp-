'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tag_Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag_Group.belongsToMany(models.Tag, {
        through: 'Tag_Tag_Group',
        as: 'GroupTag',
        foreignKey: 'groupTag_id',
      })
      Tag_Group.belongsToMany(models.User, {
        through: 'Investor_Tag_Group',
        as: 'GroupTagInvestor',
        foreignKey: 'groupTag_id',
      })
    }
  }
  Tag_Group.init(
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
      modelName: 'Tag_Group',
    }
  )
  return Tag_Group
}
