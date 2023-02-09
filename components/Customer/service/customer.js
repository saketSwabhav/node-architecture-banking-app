// import db from "../../../models/index.js";
import CustomerDTO from "../../../view/Customer.js";
import Transaction from "../../../view/transaction.js";

class CustomerService {
  constructor() {}

  async addCustomer(firstName, lastName, totalBalance) {
    try {
      await new CustomerDTO(null,firstName, lastName, totalBalance).add();
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateCustomer(id,firstName, lastName, totalBalance) {
    try {
      let temp = await new CustomerDTO(id,firstName, lastName, totalBalance).update()
      return temp;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCustomers() {
    try {
      let temp = await CustomerDTO.getAll();
      return temp;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteCustomer(customerID) {
    try {
      let temp = await CustomerDTO.delete(customerID)
      return temp;
    } catch (e) {
      throw new Error(e);
    }
  }

  async withdraw(id, amount) {
  try {
    let temp = await  CustomerDTO.withdraw(new Transaction(null,id,amount))
    return temp
  } catch (e) {
    throw new Error(e)    
  }
  }

  async deposit(id, amount) {
    try {
      let temp = await  CustomerDTO.deposit(new Transaction(null,id,amount))
      return temp
    } catch (e) {
      throw new Error(e)    
    }
  }

  async transfer(reciverID, id, amount) {
    try {
      let temp = await  CustomerDTO.transfer(new Transaction(reciverID,id,amount))
      return temp
    } catch (e) {
      throw new Error(e)    
    }
  }

  async getBalance(customerID) {
   try {
    let temp = await  CustomerDTO.getBalance(customerID)
    return temp
   } catch (e) {
    throw new Error(e)
   }
  }

  async getPassBook(customerID) {
    try {
      let temp = await  CustomerDTO.getPassBook(customerID)
      return temp
     } catch (e) {
      throw new Error(e)
     }
  }

}
export default CustomerService;
