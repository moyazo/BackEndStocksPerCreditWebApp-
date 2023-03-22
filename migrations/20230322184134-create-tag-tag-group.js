'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TagTagGroups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      groupTag_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
            model: 'Tag_Groups',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      tag_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
              model: 'Tags',
              key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('TagTagGroups');
  }
};