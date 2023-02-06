"use strict";
import { Model,DataTypes } from "sequelize";
import  sequelize  from "../db.js";

  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasMany(models.Customer)
      // define association here
    }
  }
  Account.init(
    {
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
        allowNull: true,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
      underscored: true,
      paranoid:true
    }
  );

export default Account
  // return Account;
