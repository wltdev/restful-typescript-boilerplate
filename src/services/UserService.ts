import { oO } from '@zmotivat0r/o0'

import User from '../models/user.model'
import errorHandler from '../utils/errorHandler'

interface UserI {
  name: string
  email: string
  password: string
}

class UserService extends User {
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
    console.log({ err, doc })
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