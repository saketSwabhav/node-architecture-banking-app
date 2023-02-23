// import Bank from "../../../models/bank.js";
import BankDTO from "../../../view/Bank.js";
class BankService {
  constructor(db) {
    // this.db = db;
  }
  async addBank(fullName, abbrevation) {
    try {
      await new BankDTO(null,fullName, abbrevation).add();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getBanks() {
    try {
      let temp = await BankDTO.getAll();
      console.log(temp);
      return temp
    } catch (e) {
      throw new Error(e);

    }
  }

  async updateBank(id,fullName, abbrevation) {
    try {
      let temp = await new BankDTO(id,fullName, abbrevation).update();
      return temp
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteBank(bankID) {
    try {
      await BankDTO.delete(bankID)

    } catch (e) {
      throw new Error(e)
    }
  }

}

export default BankService;
