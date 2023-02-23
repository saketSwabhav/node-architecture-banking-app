// 'use strict';

import sequelize from "../db.js";
import Account from "./account.js";
import Bank from "./bank.js";
import Customer from "./customer.js";
import PassBook from "./passbook.js";
import logger from "../utils/logger.utils.js";
import Credential from "./credential.js";


// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/db.config.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// console.log(db);
// module.exports = db;

const models = [
  Bank,
  Customer,
  Account,
  PassBook,
  Credential
]

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true });

    let models1 = sequelize.models;
    console.log(models1);

    Object.keys(models1).forEach((key) => {
      if ("associate" in models1[key]) {
        models1[key].associate(models1);
      }
    });

    await Promise.all(
      models.map(async (model) => await model.sync({ alter: true }))
    );
    
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
}

export default models

