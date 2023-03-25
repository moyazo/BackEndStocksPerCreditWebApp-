const { signup, login } = require('../controllers/auth')
const router = require('express').Router()

/**
 * *SIGN UP END-POINT*
 * *localhost:8000/auth/signup*
 * *This end-point receive some values for save a user in our DB calling to the controller of /controllers/auth.js. This will return a token to validate that the user has sign up*
 * @param {Request} request
 * @param {Response} response
 * @returns {String}
 */
router.post('/signup', async (request, response) => {
  try {
    const { email, password, name } = request.body
    if (!email || !password || !name) {
      response.status(502).json('Email, Password and Name Required')
    }
    const token = await signup(request.body)
    response.status(200).json(token)
  } catch (error) {
    response.status(500).json('Error at the route of sign up: ' + error.message)
  }
})
/**
 * *SIGN UP END-POINT*
 * *localhost:8000/auth/login*
 * *This end-point receive some values for search a user and log him in our app calling to the controller of /controllers/auth.js. This will return a token to validate that the user has log in*
 * @param {Request} request
 * @param {Response} response
 * @returns {String}
 */
router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body
    if (!email || !password) {
      response.status(502).json('Incorrect data')
    }
    const token = await login({ email, password })
    response.status(200).json(token)
  } catch (error) {
    response.status(500).json('Error at the route of sign up: ' + error.message)
  }
})

module.exports = router
