import { v4 } from "uuid"
import Account from "../models/account.js";


class AccountDTO{
    constructor(bankID,customerID,balance){
        // this.id = v4()
        this.bankID = bankID
        this.customerID = customerID
        this.balance = balance
    }
    // constructor(){
    // }
    
    validate(){

    }

  static  async getAll(){
       let temp = await Account.findAll();

       return temp
    }

}
export default AccountDTO
