// import Account from "../../../models/account.js";
import AccountDTO from "../../../view/Account.js";


class AccountService {
  constructor() {}

  async addAccount(bankID, customerID, balance) {
    try {
      await new AccountDTO(null,bankID, customerID, balance).add();

    } catch (e) {
      throw new Error(e);
    }
  }

  async getAccounts() {
    try {
      const newObj = await AccountDTO.getAll()
      console.log(newObj);
      return newObj;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateAccount(id, bankID, customerID, balance) {
    try {
      // console.log(account);
      let temp = await new AccountDTO(id, bankID, customerID, balance).update()

      return temp;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async deleteAccount(accountID) {
    try {
      let temp = await AccountDTO.delete(accountID)
      return temp;

    } catch (e) {
      throw new Error(e);
    }
  }
}

export default AccountService;
