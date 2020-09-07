/**
 * Module dependencies.
 */
import express from 'express'
import chalk from 'chalk'
import errorHandler from 'errorhandler'
import dotenv from 'dotenv'
import createApp from './configs/expressConfig'
import connectMongo from './configs/mongodb'
import appRouter from './src/routers'

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' })

/**
 * Create Express server.
 */
const app = express()
createApp(app)

/**
 * Connect to MongoDB.
 */

connectMongo()

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080)
createApp(app)

/**
 * Primary app routes.
 */

app.use('/api/v1/', appRouter)

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler())
} else {
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Server Error')
  })
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  const appUri = `http://localhost:${app.get('port')}`
  console.log('%s App is running at %s in %s mode',
    chalk.green('🚀'),
    chalk.cyan(appUri),
    app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

export default app
