const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId

const userSchema = mongoose.Schema({
    _id:{
        type:ObjectId,
        require:true

    },
    username:{
        type:String,
        require:true,
        min:3,
        max:256

    },
    email:{
        type:String,
        require:true,
        min:6,
        max:256
    },
    password:{
        type:String,
        require:true,
        min:6,
        max:1024
    },
    date_joined:{
        type:Date,
        default:Date.now
    },
    is_admin: {
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', userSchema)