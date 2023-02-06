import {
  NODE_ENV,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
} from "./env.config.js";

const sequelizeConfig = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
};

const dbConfig =
  typeof NODE_ENV === "string"
    ? sequelizeConfig[NODE_ENV]
    : sequelizeConfig.development;

export default dbConfig;
