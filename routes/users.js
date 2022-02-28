const express = require('express')
const router = express.Router()

const User = require('../models/User')
const verifyToken = require('../verifyToken')

router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        res.status(400).send({message:err})
    }
})

router.post('/set_admin/:_id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.user._id})
    try {
        if (user.is_admin) {
            const userToUpdate = await User.findById(req.params._id)
            if (userToUpdate.is_admin) {
                res.status(400).send('User is already an administrator')
            } else {
                const setAdminUser = await User.findOneAndUpdate(
                    {_id: req.params._id}, //filter to get user to update
                    {is_admin: true})
                res.send({message: 'The following user has been set as an administrator',
                          user_id: setAdminUser._id,
                          user_name: setAdminUser.username,
                          email: setAdminUser.email})
            }
        } else {
            res.status(401).send('Only administrators can set admin permissions')
                }
        } catch (err) {
            res.status(400).send({message:err})
        }
})

module.exports = router