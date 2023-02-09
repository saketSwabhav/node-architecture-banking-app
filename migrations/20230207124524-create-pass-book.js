'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('passBooks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      accountID: {
        type: Sequelize.UUID
      },
      recieverID: {
        type: Sequelize.UUID
      },
      transactionType: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "deleted_at"
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('passBooks');
  }
};