"use strict";
import { Model,DataTypes } from "sequelize";
import  sequelize  from "../db.js";

class PassBook extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    // PassBook.belongsTo(models.Account)
    PassBook.hasOne(models.Customer)
  }
}
PassBook.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accountID: {
      type: DataTypes.UUID,
      field: "account_id",
      references: {
        model: "customers", // 'banks' refers to table name
        key: "id", // 'id' refers to column name in banks table
      },
    },
    recieverID: {
      type: DataTypes.UUID,
      field: "reciever_id",
      references: {
        model: "customers", // 'banks' refers to table name
        key: "id", // 'id' refers to column name in banks table
      },
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    transactionType: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "PassBook",
    tableName:"passbook",
    // freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
);
export default PassBook