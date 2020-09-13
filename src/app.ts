/**
 * Module dependencies.
 */
import express, { Request, Response, NextFunction, Errback } from 'express'
import chalk from 'chalk'
import errorHandler from 'errorhandler'
import dotenv from 'dotenv'
import createApp from './configs/expressConfig'
import connectMongo from './configs/mongodb'
import appRouter from './routers'
import createGracefulTerminator from './configs/gracefulConfig'
import createHealthCheck from './configs/healthCheckConfig'
import { createServer } from 'http'

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' })

/* ------------------------------ SETUP EXPRESS ----------------------------- */

const PORT = process.env.PORT || 8080
const app = express()
app.set('port', process.env.PORT || 8080)
createApp(app)

/* ------------------------------ SETUP SERVER ------------------------------ */

const server = createServer(app)

/* ------------------------------- SETUP MONGO ------------------------------ */

connectMongo()

/* ---------------------------- GRACEFUL SHUTDOWN --------------------------- */

const gracefulShutdown = createGracefulTerminator(server)

/* ------------------------------ HEALTH CHECK ------------------------------ */

const healthCheck = createHealthCheck(server,
  { port: +PORT },
  gracefulShutdown.terminate)

/**
 * Primary app routes.
 */

app.use('/api/v1/', appRouter)

/* ------------------------------ ERROR HANDLER ----------------------------- */

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler())
} else {
  app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send('Server Error')
  })
}

/* ------------------------------ START SERVER ------------------------------ */

app.listen(app.get('port'), () => {
  const appUri = `http://localhost:${app.get('port')}`
  console.log('🚀 App is running at %s in %s mode',
    chalk.cyan(appUri),
    app.get('env'))
  console.log('  Press CTRL-C to stop\n')

  healthCheck.isServerReady()
})

export default app
