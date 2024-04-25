const { cekToken } = require("../helpers/jwt");
const { User } = require("../models")

async function authentication(req, res, next){
    try {
        let access_token = req.headers.authorization

        if (!access_token) {
            throw {name: "Unauthorized"}
        }

        access_token = access_token.split(' ')[1]
        const verified = cekToken(access_token)
        const findUser = await User.findByPk(verified.id)

        if (!findUser) {
            throw {name: "Unauthorized"}
        }

        req.user = {
            id : findUser.id,
            email : findUser.email,
            status : findUser.status
        }

        next()  
    } catch (error) {
        next(error)
    }
}


module.exports = {authentication}