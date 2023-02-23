import { HttpStatusCode } from "../../../constants/enums.js";

class CustomerController {
  constructor(logger, service) {
    this.logger = logger;
    this.service = service;
  }

  addCustomer = async (req, res, next) => {
    try {
      this.logger.info("========= add Customer called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }
      const { firstName, lastName, totalBalance,email,roleName,password } = req.body;

      await this.service.addCustomer(firstName, lastName, totalBalance,email,roleName,password);

      return res.status(HttpStatusCode.CREATED).send(null);
    } catch (e) {
      next(e);
    }
  };

  getCustomers = async (req, res, next) => {
    try {
      this.logger.info("========= get customers called =================");

      let val = await this.service.getCustomers();
      return res.status(HttpStatusCode.OK).send(val);
    } catch (e) {
      next(e);
    }
  };

  updateCustomer = async (req, res, next) => {
    try {
      this.logger.info("========= update bank called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }

      const { firstName, lastName, totalBalance,email,password } = req.body;
      // let customer = new Customer(firstName, lastName, totalBalance);
      const id = req.params.customerID;

      await this.service.updateCustomer(id, firstName, lastName, totalBalance,email,password);
      return res.status(HttpStatusCode.OK).send(null);
    } catch (e) {
      next(e);
    }
  };

  deleteCustomer = async (req, res, next) => {
    this.logger.info("========= delete bank called =================");

    try {
      let customerID = req.params.customerID;

      await this.service.deleteCustomer(customerID);
      return res.status(HttpStatusCode.OK).send(null);
    } catch (e) {
      next(e);
    }
  };

  withdraw = async (req, res, next) => {
    try {
      this.logger.info("========= withdraw called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }
      const { amount } = req.body;
      const id = req.params.customerID;

      await this.service.withdraw(id, amount);
      return res.status(HttpStatusCode.CREATED).send(null);
    } catch (e) {
      next(e);
    }
  };

  deposit = async (req, res, next) => {
    try {
      this.logger.info("========= deposit called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }

      const { amount } = req.body;
      const id = req.params.customerID;

      await this.service.deposit(id, amount);

      return res.status(HttpStatusCode.ACCEPTED).send(null);
    } catch (e) {
      next(e);
    }
  };

  transfer = async (req, res, next) => {
    try {
      this.logger.info("========= transfer called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }

      const { reciverID, amount } = req.body;
      const id = req.params.customerID;

      await this.service.transfer(reciverID, id, amount);
      return res.status(HttpStatusCode.CREATED).send(null);
    } catch (e) {
      next(e);
    }
  };

  getbalance = async (req, res, next) => {
    try {
      this.logger.info("========= get balance called =================");

      let val = await this.service.getBalance(req.params.customerID);
      return res.status(HttpStatusCode.OK).send(val);

    } catch (e) {
      next(e);
    }
  };

  getPassBook = async (req, res, next) => {
    try {
      this.logger.info("========= get passbook called =================");

      let val = await this.service.getPassBook(req.params.customerID);

      return res.status(HttpStatusCode.OK).send(val);
    } catch (e) {
      next(e);
    }
  };


getCustomer = async (req, res, next) => {
  try {
    this.logger.info("========= get customer called =================");

    let val = await this.service.getCustomer(req.params.customerID);

    return res.status(HttpStatusCode.OK).send(val);
  } catch (e) {
    next(e);
  }
};
}

export default CustomerController;
