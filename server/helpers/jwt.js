const jwt = require ("jsonwebtoken")

function generateToken (obj) {
    return jwt.sign(obj, "kunci")
}

function verifyToken (token) {
    return jwt.verify(token, "kunci")
}

module.exports = {generateToken, verifyToken}