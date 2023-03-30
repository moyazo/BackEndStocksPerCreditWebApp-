'use strict'
const router = require('express').Router()
const { signup } = require('../controllers/auth')
const {
  getUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  investOnProject,
} = require('../controllers/users')
/**
 * *ALL DATA FROM ONE USER IN ORDER TO SHOW AT PROFILE VIEW ON FRONT-END*
 * *localhost:8000/users/profile*
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
router.get('/profile', async (req, res) => {
  try {
    if (!req.user.email) {
      res.status(502).json('NOT EMAIL PROVIDED')
    }
    const data = await getUserByEmail(req.user.email)
    if (!data) {
      res.status(502).json('NOT DATA FOR PROFILE')
    }
    await data.reload()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await getUsers()
    if (!users) {
      res.status(502).json('No users found')
    }
    res.status(200).json(users)
  } catch (error) {
    console.log('Error getting users', error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(502).json('Not id given at the request')
    }
    const id = req.params.id
    const user = await getUserById(id)
    if (!user) {
      res.status(502).json('No user found')
    }
    res.status(200).json(user)
  } catch (error) {
    console.log('Error getting user', error.message)
  }
})

router.post('/invest', async (req, res) => {
  try {
    // TODO debemos usar el user de la request del middleware

    const { userId, projectId, amount } = req.body
    if (!userId || !projectId || !amount) {
      res.status(403).json('userId projectId amount not given at request.body')
    }
    const invested = await investOnProject(userId, projectId, amount)
    if (!invested) {
      res.status(502).json('user could not invest on project')
    }
    res.status(200).json(invested)
  } catch (error) {
    console.log('Error investing project', error.message)
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(502).json('Not id given at the request')
    }
    if (!req.body) {
      res.status(502).json('Not body given at the request')
    }
    const id = req.user.id
    const newData = req.body
    const user = await updateUser(id, newData)
    if (!user) {
      res.status(502).json('User could not be modify')
    }
    res.status(200).json(user)
  } catch (error) {
    console.log('Error modifying user', error.message)
  }
})

module.exports = router
