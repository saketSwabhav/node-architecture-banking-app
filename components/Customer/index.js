import {Router} from "express";
import CustomerController from "./controller/customer.js";
import CustomerService from "./service/customer.js";
import logger from "../../utils/logger.utils.js";


export const customerRoute = Router(); 

const service = new CustomerService()
const controller = new CustomerController(logger,service)

customerRoute.post('/',controller.addCustomer)
customerRoute.get('/',controller.getCustomers)
customerRoute.put('/:bankID',controller.updateCustomer)
customerRoute.delete('/:bankID',controller.deleteCustomer)
