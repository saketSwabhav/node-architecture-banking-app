import Bank from "../../../models/bank.js";

class BankService {
  constructor(db) {
    // this.db = db;
  }
  async addBank(bank) {
    try {
      console.log(bank);
      let temp = await Bank.create(bank);
      console.log("temp",temp);
    //   this.db.Bank.create(bank)
    } catch (e) {
        console.log(e);
      return e;
    }
  }

  async getBanks() {
    try {
      let temp = await Bank.findAll();
      console.log(temp);
      return temp
    //   this.db.Bank.create(bank)
    } catch (e) {
        console.log(e);
      return e;
    }
  }

  async updateBank(bank) {
    try {
      console.log(bank);
      let temp = await Bank.update(bank,{
        where: {
            deletedAt:null,
          id: bank.id,
          
        },paranoid:false});

    //   console.log(temp);
      return temp
    //   this.db.Bank.create(bank)
    } catch (e) {
        console.log(e);
      return e;
    }
  }

  async deleteBank(bankID) {
    try {
    //   console.log(bank);
      let temp = await Bank.destroy({
        where: {
          id: bankID
        }});

    //   console.log(temp);
      return temp
    //   this.db.Bank.create(bank)
    } catch (e) {
        console.log(e);
      return e;
    }
  }

}

export default BankService;
