const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { getUserByEmail } = require('./users')
const saltRounds = 10

const signup = async ({
  name,
  avatar,
  email,
  password,
  country,
  telf,
  last_name,
  user_type
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
    hashedPassword,
    country,
    telf,
    last_name,
    user_type
  }
  const user = await User.create({ ...newData, salt })

  return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET)
}

const login = async ({ email, password }) => {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new Error('User not found')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error('Wrong password')
  }

  return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET)
}

module.exports = {
  signup,
  login,
}