const Jwt = require('jsonwebtoken')
const secretKey = 'test'

exports.verify = token => {
  try {
    return Jwt.verify(token, secretKey)
  } catch (err) {
    return false
  }
}
exports.encrypt = object => {
  Jwt.sign(object, secretKey)
}
