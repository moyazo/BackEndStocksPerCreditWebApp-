const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { getUserByEmail } = require('./users')
const saltRounds = 10

/**
 * *signup*
 * *This function receive some values from a specific end-point at /routes/auth to save a user in our DB*
 * @param {Object}
 * @returns {String}
 */
const signup = async ({
  name,
  avatar,
  email,
  password,
  country,
  phone,
  lastName,
  userRol,
}) => {
  const existedUser = await getUserByEmail(email)

  if (existedUser) {
    throw new Error('User existed')
  }
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newData = {
    name,
    avatar,
    email,
    password: hashedPassword,
    country,
    phone,
    lastName,
    userRol,
  }
  const user = await User.create({ ...newData, salt })
  const token = jsonwebtoken.sign(
    { email: user.email },
    process.env.TOKEN_SECRET
  )
  return { token, role: user.userRol }
}
/**
 * *login*
 * *This function receive some values from a specific end-point at /routes/auth to search a user in our DB for log in at our app*
 * @param {Object}
 * @returns {String}
 */
const login = async ({ email, password }) => {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new Error('User not found')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error('Wrong password')
  }
  const token = jsonwebtoken.sign(
    { email: user.email },
    process.env.TOKEN_SECRET
  )
  return { token, role: user.userRol }
}

module.exports = {
  signup,
  login,
}
