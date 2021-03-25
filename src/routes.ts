import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
// import multer from 'multer'
// import { multerConfig } from './utils/multer'

import AuthController from './controllers/AuthController'
import UsersController from './controllers/UsersController'
import AddressesController from './controllers/AddressesController'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ hello: 'World' })
})

router.post('/login', celebrate({
  body: {
      email: Joi.string().required(),
      password: Joi.string().required()
  }
}), AuthController.login)

router.post('/signup', celebrate({
  body: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }
}), AuthController.signup)

router.get('/api/me', AuthController.myInfo)
router.put('/api/me', AuthController.updateMyInfo)

router.get('/api/users', UsersController.index)
router.post('/api/users/:user_id/address', AddressesController.store)
router.get('/api/users/:user_id/address', AddressesController.index)
router.put('/api/users/:user_id/address/:address_id', AddressesController.update)
router.delete('/api/users/:user_id/address/:address_id', AddressesController.remove)

export default router
