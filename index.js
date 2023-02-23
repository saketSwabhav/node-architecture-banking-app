import express from "express";
import logger from "./utils/logger.utils.js";
import { intializeApp } from "./app.js";
import {connectToDatabase} from "./models/index.js";

// const res = require('express/lib/response')

const app = express();
const port = process.env.PORT || 7000;

intializeApp(app);
connectToDatabase()
export default app;

app.listen(port, () => {
  logger.info(`server is running at http://localhost:${port}`);
});

//if an error is not catched
process.on("uncaughtException", (error) => {
  logger.error(error);
  process.exit(1);
});

// if a promise is not handled.
process.on("unhandledRejection", (error) => {
  logger.error(error);
});
