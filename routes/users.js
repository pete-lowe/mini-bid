const express = require('express')
const router = express.Router()

const User = require('../models/User')
const verifyToken = require('../verifyToken')

// returns basic information to an authenticated non admin user or all information other than password to admin user.
router.get('/', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.user._id})
    try {
        if (user.is_admin) {
            const users = await User.find()
            .select('username email date_joined is_admin')
            res.status(200).send(users)
        } else {
            const users = await User.find()
            .select('username date_joined')
            res.status(200).send(users)
        }} catch (err) {
            res.status(400).send({message:err})
        }
})


//allows admin users to set other users to admin
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
                    {is_admin: true}) //update is_admin flag
                res.status(200).send({message: 'The following user has been set as an administrator',
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