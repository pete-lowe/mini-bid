const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId

const bidSchema = mongoose.Schema({
    _id: {
        type:ObjectId,
        require:true
    },
    bidder_id: {
        type:ObjectId,
        require:true
    },
    bid_amount: {
        type:Number,
        require:true
    },
    bid_date: {
        type:Date,
        require:true
    }
})

const auction = mongoose.Schema({
    _id: {
        type:ObjectId,
        require:true
    },
    item_id: {
        type:String,
        require:true
    },
    start: {
        type:Date,
        require:true
    },
    end: {
        type:Date,
        require:true
    },
    highest_bid: {
        type:Number,
        require: true
    },
    highest_bidder: {
        type:ObjectId,
    },
    bid_history: {
        type:[bidSchema]
    }
})

module.exports = mongoose.model('auctions', auction)