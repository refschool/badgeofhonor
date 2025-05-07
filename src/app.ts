import express from 'express'
import logger from 'morgan'
import compression from 'compression'
import 'dotenv/config'

import api from './routes/api'

const app = express()

app.use(logger('dev'))
app.use(compression())
app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))

app.use('/api-v0', api)

export default app
