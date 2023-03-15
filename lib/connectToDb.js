


import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export default function connectToDb() {
 
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('Database connected')
  })
  return mongoose.connect(dbURI, options)
}