import Credential from "../../../view/Credential.js";

import sequelize from "../../../db.js";



class AuthService {
    constructor(){}
    
  static register = async (credential, transaction) => {
    let isTransactionPassed = true;

    if (!transaction) {
      isTransactionPassed = false;
      transaction = await sequelize.transaction();
    }

    try {
      await credential.doesUsernameExist();
      await credential.addCredential();

      if (!isTransactionPassed) {
        await transaction.commit();
      }
      return credential;
    } catch (error) {
      console.error(error);
      if (!isTransactionPassed) {
        await transaction.rollback();
      }
      throw new Error("Could not register user");
    }
  };

  login = async (credential) => {
    const transaction = await sequelize.transaction();

    try {
      // await credential.doesUsernameExist()
      const cred = await Credential.getCredential({
        username: credential.username,
        password: credential.password,
      });
      await transaction.commit();

      return cred;
    } catch (error) {
      console.error(error);
      await transaction.rollback();
      throw new Error("Invalid username or password");
    }
  };
}

export default AuthService