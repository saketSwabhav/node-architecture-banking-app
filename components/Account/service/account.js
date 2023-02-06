// import Account from "../../../models/account.js";
import AccountDTO from "../../../view/Account.js";


class AccountService {
  constructor() {}

  async addAccount(account) {
    try {
      console.log(account);
      let temp = await Account.create(account);
      console.log("temp", temp);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getAccounts() {
    try {
      const newObj = await AccountDTO.getAll()
      console.log(newObj);
      return newObj;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async updateAccount(account) {
    try {
      console.log(account);
      let temp = await Account.update(account, {
        where: {
          deletedAt: null,
          id: account.id,
        },
        paranoid: false,
      });

      return temp;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async deleteAccount(accountID) {
    try {
      let temp = await Account.destroy({
        where: {
          id: accountID,
        },
      });

      return temp;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

export default AccountService;
