import { HttpStatusCode } from "../../../constants/enums.js";
import Account from "../../../view/Account.js";

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

      let acc = Account(bankID, customerID, balance);
      this.service
        .addAccount(acc)
        .then((val) => {
          return res.status(HttpStatusCode.OK).send(null);
        })
        .catch((err) => {
          this.logger.error(err);
          return res.status(HttpStatusCode.INTERNAL_SERVER).send(err);
        });

      // return res.status(HttpStatusCode.CREATED).send(null);
    } catch (e) {
      this.logger.error(err);
    }
  };

  getAccounts = async (req, res, next) => {
    this.logger.info("========= get accounts called =================");
    try {
      this.service
        .getAccounts()
        .then((val) => {
          console.log(val);
          return res.status(HttpStatusCode.OK).send(val);
        })
        .catch((err) => {
          this.logger.error(err);
          return res.status(HttpStatusCode.INTERNAL_SERVER).send(err);
        });
    } catch (e) {
      this.logger.error(e);
    }
    // res.status(HttpStatusCode.OK).send("");
  };

  updateAccount = async (req, res, next) => {
    this.logger.info("========= update account called =================");
    try {
      if (!Object.keys(req.body).length) {
        res.status(HttpStatusCode.BAD_REQUEST).send("body cannot be empty");
      }
      let { bankID, customerID, balance } = req.body;

      let acc = Account(bankID, customerID, balance);

      this.service
        .updateAccount(acc)
        .then((val) => {
          return res.status(HttpStatusCode.OK).send(null);
        })
        .catch((err) => {
          this.logger.error(err);
          return res.status(HttpStatusCode.INTERNAL_SERVER).send(err);
        });
    } catch (e) {
      this.logger.error(e);
    }
  };

  deleteAccount = async (req, res, next) => {
    this.logger.info("========= delete account called =================");

    try {
        let accountID = req.params.bankID

      this.service.deleteAccount(accountID).then(val=>{

        return res.status(HttpStatusCode.OK).send(null)
    }).catch(err=>{
      this.logger.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER).send(err)

    })

    } catch (e) {
      this.logger.error(e);
    }
  };
}

export default AccountController;
