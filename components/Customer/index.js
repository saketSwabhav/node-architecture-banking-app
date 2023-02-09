import {Router} from "express";
import CustomerController from "./controller/customer.js";
import CustomerService from "./service/customer.js";
import logger from "../../utils/logger.utils.js";


export const customerRoute = Router(); 

const service = new CustomerService()
const controller = new CustomerController(logger,service)

customerRoute.post('/',controller.addCustomer)
customerRoute.get('/',controller.getCustomers)
customerRoute.put('/:customerID',controller.updateCustomer)
customerRoute.delete('/:customerID',controller.deleteCustomer)

customerRoute.post('/:customerID/withdraw',controller.withdraw)
customerRoute.post('/:customerID/deposit',controller.deposit)
customerRoute.post('/:customerID/transfer',controller.transfer)

customerRoute.get('/:customerID/banks/balance',controller.getbalance)
customerRoute.get('/:customerID/passbook',controller.getPassBook)

