import { HttpStatusCode } from "../../../constants/enums.js";

class AccountController {
  constructor(logger, service) {
    this.logger = logger;
    this.service = service;
  }

  addAccount = async (req, res, next) => {
    this.logger.info("========= add account called =================");
    try {
      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }

      let { bankID, customerID, balance } = req.body;
      await this.service.addAccount(bankID, customerID, balance);

      return res.status(HttpStatusCode.OK).send(null);
    } catch (e) {
      next(e);
    }
  };

  getAccounts = async (req, res, next) => {
    this.logger.info("========= get accounts called =================");
    try {
      let val = await this.service.getAccounts();
      return res.status(HttpStatusCode.OK).send(val);
    } catch (e) {
      next(e);
    }
  };

  updateAccount = async (req, res, next) => {
    this.logger.info("========= update account called =================");
    try {
      if (!Object.keys(req.body).length) {
        res.status(HttpStatusCode.BAD_REQUEST).send("body cannot be empty");
      }
      let { bankID, customerID, balance } = req.body;

      const id = req.params.accountID;
      await this.service.updateAccount(id, bankID, customerID, balance);
      return res.status(HttpStatusCode.OK).send(null);
    } catch (e) {
      next(e);
    }
  };

  deleteAccount = async (req, res, next) => {
    this.logger.info("========= delete account called =================");

    try {
      let accountID = req.params.accountID;

      await this.service.deleteAccount(accountID);

      return res.status(HttpStatusCode.OK).send(null);

    } catch (e) {
      next(e)
    }
  };
}

export default AccountController;
