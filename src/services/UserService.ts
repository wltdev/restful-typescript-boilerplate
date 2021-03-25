import { oO } from '@zmotivat0r/o0'

import User from '../models/user.model'
import errorHandler from '../utils/errorHandler'

interface UserI {
  name: string
  email: string
  password: string
}

class UserService extends User {
  public async findAll() {
    const [ err, doc ] = <any> await oO(User.findAll({}))
    if (err) {
      const errors = await errorHandler(err.errors)
      return {
        errors
      }
    }

    return doc
  }

  public async create(params: UserI) {
    const [ err, doc ] = <any> await oO(User.create(params))
    if (err) {
      const errors = await errorHandler(err.errors)
      return {
        errors
      }
    }

    return doc
  }

  public async findByEmail(email: string) {
    const [ err, doc ] = <any> await oO(User.scope('withPassword').findOne({ where: { email } }))
    if (err) {
      const errors = await errorHandler(err.errors)
      return {
        errors
      }
    }

    return doc
  }

  public async findByPk(user_id: string, params: object = {}) {
    const [ err, doc ] = <any> await oO(User.scope('withPassword').findByPk(user_id, params))
    if (err) {
      const errors = await errorHandler(err.errors)
      return {
        errors
      }
    }

    return doc
  }

}

export default UserService