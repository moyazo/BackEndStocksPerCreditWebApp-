'use strict'
const currency = {
  EUROS: 'EUROS',
  DOLLARS: 'DOLLARS',
  POUNDS: 'POUNDS',
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      duration: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      totalInvest: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalInvestor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      history: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      commerce: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      proposal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency: {
        type: Sequelize.ENUM(Object.keys(currency)),
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minimuminvestment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      actionPerCredit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ReturnOnInvestment: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      goal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects')
  },
}
