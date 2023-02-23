"use strict";
import { Model,DataTypes } from "sequelize";
import  sequelize  from "../db.js";
// module.exports = (sequelize, DataTypes) => {
class Credential extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Credential.belongsTo(models.Customer, { foreignKey: "id" });
  }
}
Credential.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    // role_id: DataTypes.UUID,
    role_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Credential",
    underscored: true,
    paranoid: true,
    timestamps:true,
    tableName: "credentials",
  }
);

// Credential.beforeCreate(cred => cred.id = v4())
export default Credential;
// return Credential;
// };
