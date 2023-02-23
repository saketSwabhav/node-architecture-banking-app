import { HttpStatusCode } from "../../../constants/enums.js"
import JwtToken from "../../../middlewares/auth.middleware.js"
import Credential from "../../../view/Credential.js"

class AuthController{
    constructor(logger,service){
        this.logger = logger
        this.service = service
    }
    
     register = async (req, res, next) => {
      this.logger.info("=========================register called==========================")

        try {
          const { username, password, roleName } = req.body
      
          if (!username || !password || !roleName) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Username, password and role name must be specified" })
            return
          }
      
          const credential = new Credential(null, username, password, roleName)
      
          const cred = await this.service.register(credential)
      
          const jwt = new JwtToken(cred.id, credential.username, cred.roleName)
          const token = jwt.generateToken()
      
          res.cookie('authorization', token, { maxAge: 900000, httpOnly: false })
      
          res.status(HttpStatusCode.OK).json({
            id: cred.id,
            username: credential.username,
            roleName: cred.roleName
          })
        } catch (error) {
          console.error(error);
          next(error)
        }
      }
      
       login = async (req, res, next) => {
        this.logger.info("=========================login called==========================")
        try {
          const { username, password } = req.body
          if (!username || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Username and password must be specified" })
            return
          }
          const credential = new Credential(null, username, password, null)
      
          const cred = await this.service.login(credential)
      
          const jwt = new JwtToken(cred.id, credential.username, cred.roleName)
          const token = jwt.generateToken()
      
          res.cookie('authorization', token)
          res.status(HttpStatusCode.OK).json({
            id: cred.id,
            username: credential.username,
            roleName: cred.roleName
          })
        } catch (error) {
          console.error(error);
          next(error)
        }
      }
}
export default AuthController