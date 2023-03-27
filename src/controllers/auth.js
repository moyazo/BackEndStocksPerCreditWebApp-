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
  lastName,
  email,
  password,
  country,
  city,
  phone,
  userRol,
}) => {
  try {
    if (!email || !password || !name){
      throw new Error('Email,  password or name not provided at sign up controller')
    }
    const existedUser = await getUserByEmail(email)
  
    if (existedUser) {
      throw new Error('User existed')
    }
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    if(!salt || !hashedPassword) {
      throw new Error('Error at generating salt or hashed password') 
    }
    const newData = {
      name,
      email,
      password: hashedPassword,
      country,
      city,
      phone,
      lastName,
      userRol,
    }
    const user = await User.create({ ...newData, salt })
    if(!user){
      throw new Error('Error creating user at sign up controller')
    }
    const token = jsonwebtoken.sign(
      { email: user.email },
      process.env.TOKEN_SECRET
    )
    if(!token){
      throw new Error('Error creating token')
    }
    return { token, role: user.userRol }
  } catch (error) {
    console.log('Error int sign up controller: ' + error.message)
  }
}
/**
 * *login*
 * *This function receive some values from a specific end-point at /routes/auth to search a user in our DB for log in at our app*
 * @param {Object}
 * @returns {String}
 */
const login = async ({ email, password }) => {
  try {
    if (!email || !password){
      throw new Error('Email or password not provided at log in controller')
    }
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
    if(!token){
      throw new Error('Error creating token')
    }
    return { token, role: user.userRol }
  } catch (error) {
    console.log('Error in login controller: ' + error.message)
  }
}

module.exports = {
  signup,
  login,
}
