const jsonwebtoken = require('jsonwebtoken')
const db = require('../models/index')
const User = db.User

const ensureAuthentication = async (request, response, next) => {
  if (request.path.includes('/auth') || request.path.includes('/landing')) {
    return next()
  }

  if (!request.headers.authorization) {
    return response.status(403).json('You are not authenticated')
  }

  const token = request.headers.authorization.split(' ')[1]
  if (!token) {
    return response.status(403).json('Invalid token')
  }

  const payload = jsonwebtoken.decode(token, process.env.TOKEN_SECRET)
  if (!payload || !payload.email) {
    return response.status(403).json('Invalid token')
  }

  const user = await User.findOne({ where: { email: payload.email } })

  if (!user) {
    return response.status(403).json('Wrong token')
  }

  request.user = { id: user.id, email: user.email, role: user.userRol }
  if(request.path.includes('/projects') && user.userRol === 'INVESTOR'){
    return response.status(403).json('You do not have permission');
  }
  
  next()
}

module.exports = {
  ensureAuthentication,
}
