import { Request, Response } from 'express'
// import bcrypt from 'bcrypt'

import UserService from '../services/UserService'

class UsersController {
  public service: UserService

  public constructor () {
    this.service = new UserService()
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.service.findAll()
      if (!users || users.errors) {
        return res.status(401).json({ errors: users.errors })
      }
      
      return res.json(users)      
    } catch (e) {
      return res.status(2400).json({ error: e.message })
    }
  }
}

export default new UsersController()
