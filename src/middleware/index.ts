import express from 'express'
import cors from 'cors'

// configure  express middleware and cors
const appMiddleware = express()
appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  })
)

appMiddleware.options('*', cors())
appMiddleware.use(express.json())
appMiddleware.use(express.urlencoded({ extended: true }))

export default appMiddleware
