import { Request, Response } from 'express'
// import bcrypt from 'bcrypt'

import Address from '../models/address.model'
import User from '../models/user.model'

class AddressesController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params
    try {
      const doc = await User.findByPk(user_id, {
        include: { association: 'addresses' }
      })
      
      return res.json(doc)      
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { user_id } = req.params
    try {
      const user = await User.findByPk(user_id)
      if (!user) {
        return res.status(404).json({ error: 'User not found'})
      }

      const doc = await Address.create({
        ...body,
        user_id
      })

      res.json(doc)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // public async getUserForTesting (): Promise<any> {
  //   let user = await User.findOne({ email: 'jest@testing.com' })
    
  //   if (!user) {      
  //     user = await User.create({
  //       name: 'jest testing',
  //       email: 'jest@testing.com',
  //       password: '123456'
  //     })
  //   }

  //   return user
  // }
}

export default new AddressesController()
