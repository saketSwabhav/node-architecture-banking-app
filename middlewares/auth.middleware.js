import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { JWT_SECRET } from "../config/env.config.js"

class JwtToken {
  constructor(id, username, roleName) {
    this.credentialID = id
    this.username = username
    this.roleName = roleName
  }

  createPayload() {
    return {
      username: this.username,
      credentialID: this.credentialID,
      roleName: this.roleName
    }
  }

  generateToken() {
    return sign(this.createPayload(), JWT_SECRET, {
      expiresIn: '1d'
    })
  }

  static authenticateCookie(req, res, next) {
    let cookie = req.cookies

    if (!cookie) {
      throw new Error("Session cookie not found. Please login")
    }

    try {
      let decode = jwt.verify(cookie['authorization'], JWT_SECRET)
      console.log(decode);
      next()
    } catch (error) {
      console.error(error);
      throw Error("Session expired. Please login again")
    }
  }

}

export default JwtToken