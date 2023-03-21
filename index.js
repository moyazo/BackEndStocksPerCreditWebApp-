const express = require('express')
const bodyParser = require('body-parser')
// const db = require('./src/models')
// const userRouter = require('./src/routes/users.js')
// const authRoutes = require('./src/routes/auth')
// const { ensureAuthentication } = require('./src/middelware/auth')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const startApp = async () => {
  const app = express()
  app.use(cors())
  const port = process.env.port

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  // app.use(ensureAuthentication)
  app.get('/', (request, response) => {
    response.json('Aquí estamos')
  })

  // app.use('/auth', authRoutes)
  // app.use('/users', userRouter)
  // app.use('/investor', Characters)
  // app.use('/entrepreneur', Students)

  try {
    app.listen(port, () => {
      console.log('APP running on port ' + port)
    })
  } catch (error) {
    console.log(error)
    process.exit(error.message)
  }
}

startApp()