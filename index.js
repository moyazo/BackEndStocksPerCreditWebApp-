const express = require('express');
const bodyParser = require('body-parser');
// const userRouter = require('./src/routes/users.js')
// const authRoutes = require('./src/routes/auth')
// const { ensureAuthentication } = require('./src/middleware/auth')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();


const startApp = async () => {
  dotenv.config();
  app.use(cors());
  const port = process.env.PORT;
  
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // app.use('/auth', authRoutes)
  // app.use('/users', userRouter)
  // app.use('/investor', Characters)
  // app.use('/entrepreneur', Students)

  try {
    app.listen(port, () => {
      console.log('APP running on port ' + port);
    })
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startApp()