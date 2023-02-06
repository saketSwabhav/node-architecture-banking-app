import {Router} from "express";
import logger from "../../utils/logger.utils.js";
import { BankController } from "./controller/bank.js";
import BankService from "./service/bank.js";

export const bankRoute = Router(); 

const service = new BankService("")
const controller = new BankController(logger,service)

bankRoute.post('/',controller.addBank)
bankRoute.get('/',controller.getBanks)
bankRoute.put('/:bankID',controller.updateBank)
bankRoute.delete('/:bankID',controller.deleteBank)