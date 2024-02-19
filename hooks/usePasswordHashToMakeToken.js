const jwt = require("jsonwebtoken")


const usePasswordHashToMakeToken = ({
    password: passwordHash,
    _id: userId,
    createdAt
  }) => {
    const secret = passwordHash + "-" + createdAt
    const token = jwt.sign({ userId }, secret, {
      expiresIn: 3600 // 1 hour
    })
    return token
  }

  module.exports = usePasswordHashToMakeToken