import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

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
    console.log('DB Connected')
    app.listen(config.port, () => {
      console.log(`Server is running at http://localhost:${config.port}`)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

connectDb()
