import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { appConfig } from '../config'
import UserService from '../services/UserService'

interface IUserRequest extends Request {
  user?: any
}


/**
 * @class
 */
class AuthController {
  public service: UserService

  public constructor () {
    this.service = new UserService()
  }

  /**
   * Login
   * @param req 
   * @param res 
   * @returns token
   */
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ message: 'need email and password' })
    }

    try {
      const user = await this.service.findByEmail(email)

      if (!user || user.errors) {
        return res.status(401).json({ message: 'User not found' })
      }

      const validPassword = await user.validPassword(password)

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' })
      }

      const token = jwt.sign({ id: user.id }, appConfig.secrets.jwt, {
        expiresIn: appConfig.secrets.jwtExp
      })

      return res.status(200).json({ token, user })

    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  }

  /**
   * Register account
   * @param req 
   * @param res 
   * @returns token
   */
  signup = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const user = await this.service.create(body)

      if (user.errors) {
        return res.status(500).json({ errors: user.errors })
      }

      const token = jwt.sign({ id: user.id }, appConfig.secrets.jwt, {
        expiresIn: appConfig.secrets.jwtExp
      })

      res.status(200).json({ token })

    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }

  /**
   * Get user data
   * @param req 
   * @param res 
   * @returns 
   */
  myInfo = async (req: IUserRequest, res: Response) => {
    return res.json(req.user)
  }

  /**
   * Update logged user data
   * @param req 
   * @param res 
   */
  updateMyInfo = async (req: IUserRequest, res: Response) => {
    const { body } = req
    try {
      const user = await req.user.update(body)

      res.status(200).json({ user })

    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }
}

export default new AuthController()
