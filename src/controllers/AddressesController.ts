import { Request, Response } from 'express'
// import bcrypt from 'bcrypt'

import Address from '../models/address.model'
import User from '../models/user.model'
import UserService from '../services/UserService'

class AddressesController {
  public userService: UserService

  public constructor () {
    this.userService = new UserService()
  }

  index = async (req: Request, res: Response) => {
    const { user_id } = req.params
    try {
      const doc = await this.userService.findByPk(user_id, {
        include: { association: 'addresses' }
      })

      // # or with method inside User class

      // const user = await this.userService.findByPk(user_id)
      // const addresses = await user.getAddresses()
      // return res.status(200).json({ addresses })

      if (!doc || doc.errors) {
        return res.status(401).json({ message: 'User not found' })
      }
      
      return res.json(doc)      
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  }

  store = async (req: Request, res: Response) => {
    const { body } = req
    const { user_id } = req.params
    try {
      const user = await this.userService.findByPk(user_id)

      if (!user || user.errors) {
        return res.status(401).json({ message: 'User not found' })
      }

      const doc = await user.createAddress(body)

      return res.json(doc)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  update = async (req: Request, res: Response) => {
    const { address_id } = req.params
    const { body } = req
    try {
      const doc = await Address.update(body, { where: { id: address_id }})
      return res.status(200).json(doc)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  remove = async (req: Request, res: Response) => {
    const { address_id } = req.params
    try {
      const doc = await Address.destroy({ where: { id: address_id }})
      return res.status(200).json(doc)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default new AddressesController()
