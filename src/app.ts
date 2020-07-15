import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import path from 'path'

import routes from './routes'
import appConfig from './config'
import { protect } from '../src/middlewares/authMiddleware'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(json())
    this.express.use(urlencoded({ extended: true }))
    this.express.use(morgan('dev'))
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
    this.express.use('/api', protect)
  }

  private database (): void {
    mongoose.connect(appConfig.dbUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes (): void {    
    this.express.use(routes)
  }
}

export default new App().express
