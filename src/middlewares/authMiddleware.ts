import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import appConfig from '../config'
import User from '../schemas/User'

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .populate('peladas')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  req.user = user
  next()
}

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, appConfig.secrets.jwt, (err: any, payload: unknown) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })