const mongoose = require('mongoose')
const Auction = require('../models/Auction')

function itemInActiveAuction(item_id, auction_list) {

    for (let i = 0; i < auction_list.length; i++) {
        if (auction_list[i].item_id.toString() == item_id) {
            return true;
        }
    }
    return false;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}


module.exports.itemInActiveAuction = itemInActiveAuction

