"use strict";
import { Model, DataTypes } from "sequelize";
import  sequelize  from "../db.js";

  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Customer.hasMany(models.Account)
      // Customer.belongsTo(models.Account)
      Customer.hasMany(models.Account)
      // Customer.belongsToMany(models.Bank,{through:"accounts"})
      // Customer.hasOne(models.PassBook,{through:"accounts"})
    }
  }
  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName:"customers",
      timestamps:true,
      paranoid:true,
      underscored:true,

    }
  );
export default Customer