const { send } = require('express/lib/response')
const jsonwebtoken = require('jsonwebtoken')


//Verification of JWT obtained following a login by user

//Returns 401 - unauthenticated if token not present or invalid

function authenticate(req, res, next) {
    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).send({message:'Access denied - please log in or register'})
    }
    try {
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch(err) {
        return res.status(401).send({message:'Invalid token'})
    }
}

module.exports = authenticate