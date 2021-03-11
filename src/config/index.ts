import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

const dbConfig = require('./database')
 
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const env = process.env

export const appConfig = {
  port: env.APP_PORT,
  secrets: {
    jwt: env.JWT_SECRET,
    jwtExp: '100d'
  }
}

export const sequelize = new Sequelize(dbConfig)