import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '../schemas/User'

class UsersController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find({}).exec()

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const user = await User.create(req.body)

    return res.json(user)
  }

  public async getUserForTesting (): Promise<any> {
    let user = await User.findOne({ email: 'jest@testing.com' })
    
    if (!user) {      
      user = await User.create({
        name: 'jest testing',
        email: 'jest@testing.com',
        password: '123456'
      })
    }

    return user
  }
}

export default new UsersController()
