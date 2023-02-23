import { v4 } from "uuid";
import sequelize from "../db.js";
import PassBook from "../view/passbook.js";
import Credential from "./Credential.js";
import AuthService from "../components/Auth/service/auth.js"
// import Transaction  from "../view/transaction.js";

class CustomerDTO {
  constructor(id, firstName, lastName, totalBalance,email,password,roleName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.totalBalance = totalBalance;
    this.email = email
    this.password = password
    this.roleName = roleName
  }

  static async getAll() {
    try {
      let array = await sequelize.models.Customer.findAll({
        where:{roleName:"Customers"}
      });
      console.log(array);
      let temp = [];
      array.forEach((element) => {
        const acc = new CustomerDTO(
          element.id,
          element.firstName,
          element.lastName,
          element.totalBalance,
          element.email,
          element.password
        );
        temp.push(acc);
      });
      return temp;
    } catch (error) {
      throw new Error(error);
    }
  }

  async add() {
    const transaction = await sequelize.transaction()

    try {
      this.id = v4();

      let response = await sequelize.models.Customer.create(this,{transaction:transaction});

      console.log(this);
      console.log(response);
      const cred = new Credential(response.id, this.email, this.password, "Customer",true)
      await AuthService.register(cred, transaction)
      await transaction.commit()

    } catch (error) {
      await transaction.rollback()
      throw new Error(error);
    }
  }

  async update() {
    try {
      return sequelize.models.Customer.update(this, {
        where: {
          id: this.id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      return sequelize.models.Customer.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async transfer(tran) {
    let t = await sequelize.transaction();
    try {
      const senderObj = await sequelize.models.Customer.findOne({
        where: {
          id: tran.ownerID,
        },
        transaction: t,
      });

      const tempBalance = senderObj.dataValues.totalBalance;

      if (tempBalance < tran.amount) {
        throw new Error("account doesnt have enough money to transfer");
      }

      senderObj.setDataValue("totalBalance", tempBalance - tran.amount);
      await senderObj.save({ transaction: t });

      const recieverObj = await sequelize.models.Customer.findOne({
        where: {
          id: tran.reciverID,
        },
        transaction: t,
      });

      recieverObj.setDataValue(
        "totalBalance",
        recieverObj.dataValues.totalBalance + tran.amount
      );

      await recieverObj.save({ transaction: t });

      await sequelize.models.PassBook.create(
        new PassBook(tran.ownerID, "debited", tran.reciverID, tran.amount),
        {
          transaction: t,
        }
      );

      await sequelize.models.PassBook.create(
        new PassBook(tran.reciverID, "credited", tran.ownerID, tran.amount),
        {
          transaction: t,
        }
      );
    } catch (e) {
      await t.rollback();
      throw new Error(e);
    }
    t.commit();
  }

  static async withdraw(tran) {
    let t = await sequelize.transaction();
    try {
      const tempObj = await sequelize.models.Customer.findOne({
        where: {
          id: tran.ownerID,
        },
        transaction: t,
      });

      const tempBalance = tempObj.dataValues.totalBalance;

      if (tempBalance < tran.amount) {
        throw new Error("account doesnt have enough money to withdraw");
      }

      const tempAccObj = await sequelize.models.Account.findOne({
        where: {
          customer_id: tran.ownerID,
        },
        transaction: t,
      });

      tempAccObj.setDataValue("balance", tempBalance - tran.amount);

      tempObj.setDataValue("totalBalance", tempBalance - tran.amount);

      await tempObj.save({ transaction: t });

      await sequelize.models.PassBook.create(
        new PassBook(tran.ownerID, "withdraw", null, tran.amount),
        {
          transaction: t,
        }
      );
    } catch (e) {
      await t.rollback();
      throw new Error(e);
    }
    await t.commit();
  }

  static async deposit(tran) {
    let t = await sequelize.transaction();
    try {
      const tempObj = await sequelize.models.Customer.findOne({
        where: {
          id: tran.ownerID,
        },
        transaction: t,
      });

      tempObj.setDataValue(
        "totalBalance",
        tempObj.dataValues.totalBalance + tran.amount
      );

      await tempObj.save({ transaction: t });

      console.log(tran.ownerID);
      const pb = new PassBook(tran.ownerID, "deposit", null, tran.amount);

      console.log(pb);
      await sequelize.models.PassBook.create(pb, {
        transaction: t,
      });
    } catch (e) {
      await t.rollback();
      throw new Error(e);
    }
    t.commit();
  }

  static async getBalance(id) {
    try {
      let temp = await sequelize.models.Account.findAll({
        include: Customer,
        where: {
          customer_id: id,
        },
      });

      return temp;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getPassBook(customerID) {
    try {
      let temp = await sequelize.models.Customer.findAll({
        where: {
          id: customerID,
        },
        include: sequelize.models.PassBook,
        
      });
      
      // include: { all: true, nested: true },
      return temp;
    } catch (e) {
      throw new Error(e);
    }
  }


static async getCustomer(customerID) {
  try {
    let temp = await sequelize.models.Account.findAll({
      where: {
        customer_id: customerID,
      },
      include: { all: true, nested: true },
      
    });
    
    // include: sequelize.models.Bank,
    return temp;
  } catch (e) {
    throw new Error(e);
  }
}
}
export default CustomerDTO;

// export { Transaction}
