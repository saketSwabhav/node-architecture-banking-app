"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("accounts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      bank_id: {
        type: DataTypes.UUID,
        references: {
          model: 'banks', // 'banks' refers to table name
          key: 'id', // 'id' refers to column name in banks table
       }
      },
      customer_id: {
        type: DataTypes.UUID,
        references: {
          model: 'customers', // 'customers' refers to table name
          key: 'id', // 'id' refers to column name in customers table
       }
      },
      balance: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accounts");
  },
};
