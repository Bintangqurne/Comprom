const jwt = require('jsonwebtoken')
const rahasia = process.env.SECRET

const createToken = (payload) => jwt.sign(payload, rahasia)
const cekToken = (payload) => jwt.verify(payload, rahasia)

module.exports = {
    createToken,
    cekToken
}