import { v4 } from "uuid";
import sequelize from "../db.js";

class AccountDTO {
  constructor(id,bankID, customerID, balance) {
    this.id = id
    this.bankID = bankID;
    this.customerID = customerID;
    this.balance = balance;
    this.passbook = [];
  }
  // constructor(){
  // }

  validate() {}

  static async getAll() {
    try {
      let array = await sequelize.models.Account.findAll()
      console.log(array);
      let temp = []
      array.forEach(element => {
        const acc = new AccountDTO(element.id,element.bankID,element.customerID,element.balance)
        delete acc.passbook
        temp.push(acc)
      });
      return temp;
    } catch (error) {
      throw new Error(error);
    }
  }

  async add() {
    try {
      this.id = v4()
      return sequelize.models.Account.create(this);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update() {
    try {
      return sequelize.models.Account.update(this,{
        where:{
          id:this.id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

 static async delete(id) {
    try {
      return sequelize.models.Account.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AccountDTO;
