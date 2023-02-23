import sequelize from "../db.js";
import { NIL, v4 } from "uuid";
import { Op } from "sequelize";

class Credential {
  constructor(id, username, password, roleName, isActive) {
    this.id = id
    this.username = username
    this.password = password
    this.roleName = roleName
    this.isActive = isActive
  }

  setID(id) {
    this.id = id
  }

  setUsername(username) {
    this.username = username
  }

  setRoleName(roleName) {
    this.roleName = roleName
  }

  setIsActive(isActive) {
    this.isActive = isActive
  }

  async doesUsernameExist() {
    try {
      const findUsername = await sequelize.models.Credential.findOne({
        where: {
          username: this.username,
          id: {
            [Op.not]: this.id ? this.id : NIL
          },
        }
      })

      if (findUsername) {
        throw new Error("Username exist. Please try with new username")
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async doesCredentialExist() {
    try {
      const findCredential = await sequelize.models.Credential.findOne({
        where: {
          id: this.id,
        }
      })

      if (!findCredential) {
        throw new Error("Credential not found")
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  createPayload() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      role_name: this.roleName,
      is_active: this.isActive
    }
  }

  async addCredential(transaction) {
    try {
      if (!this.id) {
        this.id = v4()
      }
      console.log(this);
      const credential = await sequelize.models.Credential.create(this.createPayload(), { transaction: transaction })
      return credential
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }

  async updateCredential(transaction) {
    try {
      const credential = await sequelize.models.Credential.update(this.createPayload(), {
        where: {
          id: this.id
        },
        transaction: transaction,
        // fields: ['password']
      })
      return credential
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }

  static createResponse(credential) {
    return {
      id: credential.id,
      username: credential.username,
      password: credential.password,
      roleName: credential.role_name,
      isActive: credential.is_active,
    }
  }

  static async getCredential(queryparams) {
    try {

      // include will do default outer join.
      // this can be overridden with required:true -> this will do inner join

      const cred = await sequelize.models.Credential.findOne({
        where: queryparams,
      })

      if (cred) {
        return Credential.createResponse(cred)
      }

      throw new Error({ error: "Incorrect username or password" })
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }

  static async getCredentials(queryparams) {
    try {

      // include will do default outer join.
      // this can be overridden with required:true -> this will do inner join

      const cred = await sequelize.models.Credential.findAll({
        where: queryparams,
        order: [
          ['createdAt', 'ASC']
        ],
      })

      const credentials = []
      if (cred && cred?.length > 0) {
        for (let index = 0; index < cred?.length; index++) {
          credentials.push(Credential.createResponse(cred[index]))
        }
      }

      return credentials
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }
}

export default Credential