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
      // Account.hasMany(models.Customer,{foreignKey:"customer_id"})
      Account.belongsTo(models.Customer)
      // Account.hasMany(models.PassBook)
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
      bankID: {
        type: DataTypes.UUID,
        references: {
          model: 'banks', // 'banks' refers to table name
          key: 'id', // 'id' refers to column name in banks table
       },
       field: "bank_id",
      },
      customerID: {
        type: DataTypes.UUID,
        references: {
          model: 'customers', // 'customers' refers to table name
          key: 'id', // 'id' refers to column name in customers table
       },
       field: "customer_id",
      },
      balance: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
      underscored: true,
      paranoid:true,
      timestamps:true,
      
    },
  //   weddings.beforeCreate(async (data, options) => {
  //     data.Id = await Buffer.from(utility.generateUID().replace('-', ''), 'hex');

  // });

    // Account.beforeCreate(async (data, options) => {
    //   data.id = v4()
    // })
  );

export default Account
  // return Account;
