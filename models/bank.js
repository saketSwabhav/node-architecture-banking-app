"use strict";

import { Model,DataTypes } from "sequelize";
import  sequelize  from "../db.js";
// export default (sequelize, DataTypes) => {
  class Bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bank.hasMany(models.Account);
    }
  }
  Bank.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      abbreviation: {
        type: DataTypes.STRING,
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
      modelName: "Bank",
      tableName: "banks",
      underscored: true,
      timestamps:true,
      paranoid:true//for deleted at field it works with time stamp true
    }
  );
  export default Bank;
  // return Bank;
// };