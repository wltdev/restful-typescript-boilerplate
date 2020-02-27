import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../schemas/User'
import appConfig from '../config'

class AuthController {
  public async login (req: Request, res: Response): Promise<Response> {
    const { email, password } =  req.body

    if (!email || !password) {
      return res.status(400).send({ message: 'need email and password' })
    }

    try {
      const user = await User.findOne({ email }).select('email password').exec()
      console.log(email, user)
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }
      
      const validPassword = user.comparePassword(password)    
  
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' })
      }    
  
      const token = jwt.sign({ id: user._id }, appConfig.secrets.jwt, {
                      expiresIn: appConfig.secrets.jwtExp
                    })
      
      return res.status(200).json({ token })

    } catch (e) {
      return res.status(2400).json({ error: e.message })
    }
  }

  /**
   * User signup
   * @param req
   */
  public async signup( req: Request, res: Response ): Promise<Response> {
    const { body } = req

    try {
      const user = await User.create(body)

      const token = jwt.sign({ id: user._id }, appConfig.secrets.jwt, {
        expiresIn: appConfig.secrets.jwtExp
      })

      return res.status(200).json({ token })
      
    } catch (e) {
      return res.status(2400).json({ error: e.message })
    }
  }

  /**
   * Make a token to user authentication
   */
 private newToken(user_id: string): string {
  return jwt.sign({ id: user_id }, appConfig.secrets.jwt, {
      expiresIn: appConfig.secrets.jwtExp
    })
  }
}

export default new AuthController()
