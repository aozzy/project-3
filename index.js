import path from 'path'
const __dirname = path.resolve()
const dist = path.join(__dirname, 'dist')

import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import connectToDb from './lib/connectToDb.js'
import errorHandler from './middleware/errorHandler.js'
// import { secret } from  './config/environment.js'

import { PORT } from './config/environment.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

async function startServer() {
  await connectToDb()

  console.log(' 🏙  Welcome to Cityscapes You are now connected to mongo!')
  console.log(PORT)

  app.use(express.json())

  app.use(logger)

  app.use('/api', router)

  app.use(errorHandler)

  app.use('/', express.static(dist))

  app.get('*', function (req, res) {
    res.sendFile(path.join(dist, 'index.html'))
  })
  // console.log(path.join(__dirname)) 
  console.log('connected :)')

  app.listen(PORT, () => console.log(`🏙  Up and running on port ${PORT} `))
}

startServer()

export default app
