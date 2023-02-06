'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('banks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      fullName: {
        type: DataTypes.STRING
      },
      abbreviation: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('banks');
  }
};