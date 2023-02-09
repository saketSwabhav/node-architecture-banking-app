import { HttpStatusCode } from "../../../constants/enums.js";

export class BankController {
  constructor(logger, service) {
    this.logger = logger;
    this.service = service;
  }

  addBank = async (req, res, next) => {
    try {
      this.logger.info("========= add bank called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }
      const { fullName, abbrevation } = req.body;

      await this.service.addBank(fullName, abbrevation);
      return res.status(HttpStatusCode.CREATED).send(null);
    } catch (e) {
      next(e);
    }
  };

  getBanks = async (req, res, next) => {
    try {
      this.logger.info("========= get banks called =================");

      let val = await this.service.getBanks();
      return res.status(HttpStatusCode.OK).send(val);
    } catch (e) {
      next(e);
    }
  };

  updateBank = async (req, res, next) => {
    try {
      this.logger.info("========= update bank called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }

      const { fullName, abbrevation } = req.body;

      const id = req.params.bankID;

      await this.service.updateBank(id, fullName, abbrevation);
      return res.status(HttpStatusCode.OK).send(null);
    } catch (e) {
      next(e);
    }
  };

  deleteBank = async (req, res, next) => {
    this.logger.info("========= delete bank called =================");

    try {
      let bankID = req.params.bankID;

      await this.service.deleteBank(bankID);
      return res.status(HttpStatusCode.OK).send(null);
    } catch (e) {
      next(e)
    }
  };
}

// export default BankController
