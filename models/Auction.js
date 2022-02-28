const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId

const bidHistorySchema = mongoose.Schema({
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

const auctionSchema = mongoose.Schema({
    _id: {
        type:ObjectId,
        require:true
    },
    item_id: {
        type:String,
        require:true
    },
    status: {
        type:String, enum: ['active', 'closed', 'cancelled'],
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
    duration: {
        type:Number,
        require: true
    },
    highest_bid: {
        type:String,
        require: true
    },
    highest_bidder: {
        type:ObjectId,
    },
    bid_history: {
        type:[bidHistorySchema]
    }
})

module.exports = mongoose.model('auctions', auctionSchema)
