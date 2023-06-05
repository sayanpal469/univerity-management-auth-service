import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorlogger } from './shared/logger'

const connectDb = async () => {
  try {
    await mongoose.set('strictQuery', false)
    await mongoose.connect(
      config.db_url as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    )
    logger.info('DB Connected')
    app.listen(config.port, () => {
      logger.info(`Server is running at http://localhost:${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Error connecting to the database:', error)
  }
}

connectDb()
