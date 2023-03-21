'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      goal: {
        type: Sequelize.STRING
      },
      min_invest: {
        type: Sequelize.INTEGER
      },
      action_per_credit: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      history: {
        type: Sequelize.STRING
      },
      proposal: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      comerce: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};