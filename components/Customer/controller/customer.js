import Customer from "../../../view/Customer.js";

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
      const { firstName, lastName, totalBalance } = req.body;
      let customer = new Customer(firstName, lastName, totalBalance);

      this.service
        .addCustomer(customer)
        .then((val) => {
          return res.status(HttpStatusCode.CREATED).send(null);
        })
        .catch((err) => {
          this.logger.error(err);
          return res.status(HttpStatusCode.INTERNAL_SERVER).send(err);
        });
    } catch (e) {
      this.logger.error(e);
    }
  };

  getCustomers = async (req, res, next) => {
    try {
      this.logger.info("========= get customers called =================");

      this.service
        .getCustomers()
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
  };

  updateCustomer = async (req, res, next) => {
    try {
      this.logger.info("========= update bank called =================");

      if (!Object.keys(req.body).length) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .send("body cannot be empty");
      }

      const { firstName, lastName, totalBalance } = req.body;
      let customer = new Customer(firstName, lastName, totalBalance);
      customer.id = req.params.customerID;

      this.service
        .updateCustomer(customer)
        .then((val) => {
          // console.log(val);
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

  deleteCustomer = async (req, res, next) => {
    this.logger.info("========= delete bank called =================");

    try {
      let customerID = req.params.customerID;

      this.service
        .deleteCustomer(customerID)
        .then((val) => {
          // console.log(val);
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
}
export default CustomerController;
