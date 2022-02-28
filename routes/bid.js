const express = require('express')
const Bid = require('../models/Bid')
const mongoose = require('mongoose')
const router = express.Router()
const verifyToken = require('../verifyToken')


router.post('/:item_id', verifyToken, (req, res) => {
    
})


module.exports = router