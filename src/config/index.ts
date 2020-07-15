import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const env = process.env

const appConfig = {
  port: env.APP_PORT,
  dbUrl: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`,
  secrets: {
    jwt: env.JWT_SECRET,
    jwtExp: '100d'
  }
}

export default appConfig
