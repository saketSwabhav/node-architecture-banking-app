import {Router} from "express";
import { accountRoute } from "./Account/index.js";
import { bankRoute } from "./Bank/index.js";
import { customerRoute } from "./Customer/index.js";

export const unguardedRoute = Router(); 
 
unguardedRoute.use("/account", accountRoute); 
unguardedRoute.use("/bank", bankRoute); 
unguardedRoute.use("/customer", customerRoute); 