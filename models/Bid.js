const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId

const bid = mongoose.Schema({
    _id: {
        type:ObjectId,
        require:true
    },
    bidder_id: {
        type:ObjectId,
        require:true
    },
    bid_date: {
        type:Date,
        require:true
    },
    bid_amount: {
        type:String,
        require:true
    }
})