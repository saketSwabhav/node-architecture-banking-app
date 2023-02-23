import {Router} from "express";
import logger from "../../utils/logger.utils.js";
import AuthController from "./controller/auth.js";
import AuthService from "./service/auth.js";

export const authRouter = Router()

const service = new AuthService("")
const controller = new AuthController(logger,service)


authRouter.post("/login", controller.login)
authRouter.post("/register", controller.register)
// authRouter.post("/dummy-login", controller.)