import mongoose from 'mongoose'
import chalk from 'chalk'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log('%s %s Please make sure MongoDB is running.',
    chalk.red('✗'),
    chalk.bgRedBright('MongoDB connection error.'))
  console.log('%s', chalk.bgMagenta('Please start docker for mongo local'))
  process.exit()
})

const connectMongo = (options = {}) => {
  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  mongoose
    .connect(dbUri, options)
    .then(() =>
      console.log('%s MongoDB connect on %s',
        chalk.green('✔'),
        chalk.cyan(dbUri)))
}

export default connectMongo
