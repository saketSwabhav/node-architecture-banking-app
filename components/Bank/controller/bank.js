import { HttpStatusCode } from "../../../constants/enums.js";
import Bank from "../../../view/Bank.js";

export class BankController {
  constructor(logger,service) {
    this.logger = logger;
    this.service = service;
  }

  addBank = async (req, res, next) => {
    try {
      this.logger.info("========= add bank called =================");

      if (!Object.keys(req.body).length) {
        return res.status(HttpStatusCode.BAD_REQUEST).send("body cannot be empty");
      }
      const { fullName, abbrevation } = req.body;
      let bank = new Bank(fullName,abbrevation)
      
      this.service.addBank(bank).then(val=>{
          return res.status(HttpStatusCode.CREATED).send(null)

      }).catch(err=>{
      this.logger.error(err);
        return res.status(HttpStatusCode.INTERNAL_SERVER).send(err)
        
      })


    } catch (e) {
      this.logger.error(e);
    }
  };

  getBanks = async (req, res, next) => {
    try {
      this.logger.info("========= get banks called =================");

      this.service.getBanks().then(val=>{
        console.log(val);
        return res.status(HttpStatusCode.OK).send(val)
    }).catch(err=>{
      this.logger.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER).send(err)

    })
      
    } catch (e) {
      this.logger.error(e);
    }
  };

  updateBank = async (req, res, next) => {
    try {
      this.logger.info("========= update bank called =================");

      if (!Object.keys(req.body).length) {
        return res.status(HttpStatusCode.BAD_REQUEST).send("body cannot be empty");
      }

      const { fullName, abbrevation } = req.body;
      let bank = new Bank(fullName,abbrevation)
      bank.id = req.params.bankID

      this.service.updateBank(bank).then(val=>{
        // console.log(val);
        return res.status(HttpStatusCode.OK).send(null)
    }).catch(err=>{
      this.logger.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER).send(err)

    })
    } catch (e) {
      this.logger.error(e);
    }
  };

  deleteBank = async (req, res, next) => {
    this.logger.info("========= delete bank called =================");

    try {
        let bankID = req.params.bankID

      this.service.deleteBank(bankID).then(val=>{
        // console.log(val);
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

// export default BankController
