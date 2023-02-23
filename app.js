import { unguardedRoute } from "./components/index.js";
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import morganMiddleware from './middlewares/morgan.middleware.js'
import errorHandlerMiddleware from './middlewares/error.middleware.js'

export function intializeApp(app) {
  app.use(cors());

  // Middlewares
  app.use(morganMiddleware);
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Initial Api route
  app.use("/api/v1/bank-app", unguardedRoute);

  // Error handler
  app.use(errorHandlerMiddleware);

}
