import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import formData from 'express-form-data'
import expressStatusMonitor from 'express-status-monitor'
import compression from 'compression'
import lusca from 'lusca'
import session from 'express-session'

const createApp = (app) => {
  app.use(expressStatusMonitor())
  app.use(compression())

  app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET || 'sessionsecrete',
      cookie: { maxAge: 1209600000 },
    }))

  app.use(lusca({
      xframe: 'SAMEORIGIN',
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      xssProtection: true,
      nosniff: true,
      referrerPolicy: 'same-origin',
    }))

  app.disable('x-powered-by')

  app.use(express.json())
  app.use(formData.parse())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors({
      exposedHeaders: ['X-Total-Count'],
    }))

  app.all('*', function (req, res, next) {
    var origin = req.get('origin')
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
  })
  app.use(morgan('combined'))
}

export default createApp
