const express = require('express')
const Auction = require('../models/Auction')
const mongoose = require('mongoose')
const router = express.Router()
const auction_helper = require('../helper/auction_helper')

const Item = require('../models/Item')
const verifyToken = require('../verifyToken')

const {startAuctionValidation} = require('../validations/auction_validation');
const { userIsItemOwner } = require('../helper/auction_helper');
const { date } = require('joi');

router.get('/active', verifyToken, async (req, res) => {
    try {
        const auctions = await Auction.find({status:'active'}).exec()
        res.send(auctions)
    } catch (err) {
        res.status(400).send({message:err})
    }
})

router.get('/closed', verifyToken, async (req, res) => {
    try {
        const auctions = await Auction.find({status:'closed'}).exec()
        res.send(auctions)
    } catch (err) {
        res.status(400).send({message:err})
    }
})

router.get('/cancelled', verifyToken, async (req, res) => {
    try {
        const auctions = await Auction.find({status:'cancelled'}).exec()
        res.send(auctions)
    } catch (err) {
        res.status(400).send({message:err})
    }
})

router.post('/start_auction', verifyToken, async (req, res) => {

    const {error} = startAuctionValidation(req.body)
    if (error) {
        res.status(400).send({item_id:'Please enter a valid item id',
        auction_duration: 'Please enter an auction duration of between 1 and 30 days'})
        return;
    } else {
        const itemDetails = await Item.findById(req.body.item_id).exec()
        if (!itemDetails) {
            res.status(400).send('No item exists with the id: ' + req.body.item_id)
            return;
        }

        if (!(itemDetails.item_owner.toString() == req.user._id)) {
            res.status(400).send('Only the items owner can create a new auction')
            return;
        }

        const activeAuctions = await Auction.find({status:'active'}).exec()

        if (auction_helper.itemInActiveAuction(req.body.item_id, activeAuctions)) {
            res.status(400).send('The specified item is already in an active auction')
            return;
        }
    }

   var today = new Date();

    const newAuction = new Auction({
        _id: new mongoose.Types.ObjectId(),
        item_id: req.body.item_id,
        status: 'active',
        start: today,
        end: today.addDays(req.body.auction_duration),
        duration: req.body.auction_duration,
        highest_bid: 0,
        highest_bidder: null
    })

    try {
        const savedAuction = await newAuction.save();
        res.status(200).send({
            message: 'Auction successfully started.',
            auction: newAuction
        })
    } catch (err) {
        res.status(400).send('Something went wrong!')
    }
})

module.exports = router