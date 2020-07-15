import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import User from '../../src/schemas/User'
import appConfig from '../../src/config'

describe('Users', () => {
  beforeAll(async() => {
    await mongoose.connect(appConfig.dbUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await User.deleteOne({ email: 'jest@testing.com' })
  })

  afterAll(async() => { 
    await User.deleteOne({ email: 'jest@testing.com' })
    await mongoose.disconnect()
  })

  it('should encrypted user password', async () => {
    const user = await User.create({
      email: 'jest@testing.com',
      name: 'jest testing',
      password: '123456'
    })

    const hashCompare = await bcrypt.compare('123456', user.password)

    expect(hashCompare).toBe(true)
  })
})
