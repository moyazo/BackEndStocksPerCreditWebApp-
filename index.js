const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./src/routes/users.js')
const landingRoute = require('./src/routes/landing')
const authRoutes = require('./src/routes/auth')
const projectRoutes = require('./src/routes/projects')
const tagRoutes = require('./src/routes/tags')
const tagGroupsRoutes = require('./src/routes/tagGroups')
const dashBoardRoutes = require('./src/routes/dashboard')
const { ensureAuthentication } = require('./src/middleware/auth')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

const startApp = async () => {
  dotenv.config()
  app.use(cors())
  const port = process.env.PORT | 8000

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(ensureAuthentication)
  app.use('/auth', authRoutes)
  app.use('/dashboard', dashBoardRoutes)
  app.use('/landing', landingRoute)
  app.use('/users', userRoutes)
  app.use('/projects', projectRoutes)
  app.use('/tags', tagRoutes)
  app.use('/tagGroups', tagGroupsRoutes)
  try {
    app.listen(port, () => {
      console.log('APP running on port ' + port)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

startApp()
