import {Router} from "express";
import logger from "../../utils/logger.utils.js";
import  AccountController from "./controller/account.js"
import  AccountService from "./service/account.js"

export const accountRoute = Router();

const service = new AccountService()
const controller = new AccountController(logger,service)

accountRoute.post('/',controller.addAccount)
accountRoute.get('/',controller.getAccounts)
accountRoute.put('/:accountID',controller.updateAccount)
accountRoute.delete('/:accountID',controller.deleteAccount)