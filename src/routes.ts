import { Router } from 'express'
import { celebrate, Joi, errors, Segments } from 'celebrate'
import multer from 'multer'
import { multerConfig } from './utils/multer'

import AuthController from './controllers/AuthController'
import UsersController from './controllers/UsersController'
import AddressesController from './controllers/AddressesController'
// import PeladasController from './controllers/PeladasController'

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

router.get('/api/users', UsersController.index)
router.post('/api/users', UsersController.store)

router.post('/api/users/:user_id/address', AddressesController.store)
router.get('/api/users/:user_id/address', AddressesController.index)

//Pelada
// router.get('/api/peladas', PeladasController.index)
// router.post('/api/peladas', multer(multerConfig).single('file'), PeladasController.store)
// router.put('/api/peladas/:id', multer(multerConfig).single('file'), PeladasController.update)

export default router
