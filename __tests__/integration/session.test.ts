import request from 'supertest'

import app from '../../src/app'
import UsersController from '../../src/controllers/UsersController'
import { verifyToken } from '../../src/middlewares/authMiddleware'

describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const user = await UsersController.getUserForTesting()

    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200)
  })

  it('should be a token authentication', async () => {
    const user = await UsersController.getUserForTesting()

    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: '123456'
      })
    
    const validToken = await verifyToken(response.body.token)

    expect(response.status).toBe(200)
  })
})
