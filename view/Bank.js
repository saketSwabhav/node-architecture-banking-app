import { v4 } from "uuid";
import sequelize from "../db.js";



class BankDTO {
  constructor(id, fullName, abbr) {
    this.id = id;
    this.fullName = fullName;
    this.abbreviation = abbr;
  }

  static async getAll() {
    try {
        // console.log(sequelize.models);
      let array = await sequelize.models.Bank.findAll();
      console.log(array);
      let temp = [];
      array.forEach((element) => {
        const acc = new BankDTO(
          element.id,
          element.fullName,
          element.abbreviation
        );
        temp.push(acc);
      });

      return temp;
    } catch (error) {
      throw new Error(error);
    }
  }

  async add() {
    try {
      this.id = v4();
      return sequelize.models.Bank.create(this);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update() {
    try {
      return sequelize.models.Bank.update(this, {
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
      return sequelize.models.Bank.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default BankDTO;
