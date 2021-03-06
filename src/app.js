require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { NODE_ENV } = require('./config')
const {CLIENT_ORIGIN} = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const UsersRouter = require('./router/UsersRouter')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common'

  app.use(morgan(morganOption))
  app.use(helmet())
  app.use(cors())
  app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
  );

app.use(validateBearerToken)

app.use('/api', UsersRouter)

app.get('/', (req,res,next) => {
  res.send('Hello, world!')
  })
    
module.exports = app