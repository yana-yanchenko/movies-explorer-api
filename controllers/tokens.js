const jwt = require('jsonwebtoken');

const {NODE_ENV, JWT_SECRET} = process.env;
const { SECRET } = require('../config/config')

module.exports.getAccessToken = (data) => {
  const token = jwt.sign(data, NODE_ENV === 'production' ? JWT_SECRET : SECRET, { expiresIn: '7d'});
  return token
}

module.exports.checkAccessToken = (token) => {
  try {
    const data = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET)
    return data
  } catch (error) {
    return null
  }
}