const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId

var conditions = {
    values: ['new', 'used']
  , message: 'You have entered an incorrect item_condition, the possible values are \'new\' and \'used\'.'
  }

const itemSchema = mongoose.Schema({
    _id:{
        type:ObjectId,
        require:true
    },
    item_name:{
        type:String,
        require:true
    },
    date_created:{
        type:Date,
        require:true
    },
    item_condition:{
        type:String,
        enum: conditions
    },
    item_description:{
        type:String,
        require:true,
        max:1024
    },
    in_auction:{
        type:Boolean,
        require:true,
        default: false,
    },
    item_owner:{
        type:ObjectId,
        require:true,
    }
})

module.exports = mongoose.model('items', itemSchema)