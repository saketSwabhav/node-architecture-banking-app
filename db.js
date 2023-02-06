import { Sequelize } from "sequelize";
import dbConfig from "./config/db.config.js";
import { isDev } from "./config/env.config.js";
import logger from "./utils/logger.utils.js";

const { database, username, password, dialect, host } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
  define: {
    underscored: true,
  },
  dialect,
  host,
  logging: !isDev,
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true })
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
}
// export default connectToDatabase;

export default sequelize;
