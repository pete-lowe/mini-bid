const express = require('express')
const Auction = require('../models/Auction')
const mongoose = require('mongoose')
const router = express.Router()
const auction_helper = require('../helper/auction_helper')

const Item = require('../models/Item')
const verifyToken = require('../verifyToken')

const {startAuctionValidation} = require('../validations/auction_validation');
const {postBidValidation} = require('../validations/auction_validation');
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


router.post('/:auction_id/post_bid', verifyToken, async (req, res) => {
    const {error} = postBidValidation(req.body)
    if (error) {
        res.status(400).send('Please enter a valid bid (greater than 0).')
        return;
    }
    try {
        const auction = await Auction.findById(req.params.auction_id)
        if (!auction) {
            res.status(400).send('That auction does not exist!')
            return;
        }
        if (auction.end <= Date.now()) {
            res.status(400).send('You can only bid in active auctions!')
            return;
        }
        const itemInAuction = await Item.findById(auction.item_id)
        if (itemInAuction.item_owner.toString() == req.user._id) {
            res.status(400).send('You cannot bid on your own item!')
            return;
        }
        const highestBid = auction.highest_bid
        const newBidAmount = req.body.bid_amount
        if (highestBid > newBidAmount) {
            res.status(400).send('Your bid must be higher than the current highest bid')
            return;
        }

        const newBid = {
            bid_id: mongoose.Types.ObjectId(),
            bidder_id: mongoose.Types.ObjectId(req.user._id),
            bid_amount: req.body.bid_amount,
            bid_date: new Date()
        }

        auction.bid_history.push(newBid)
        auction.highest_bid = newBid.bid_amount
        auction.highest_bidder = newBid.bidder_id
        await auction.save()
        res.status(200).send({
            message: 'Bid sucessfully recorded',
            details: auction})

    } catch (err) {
        res.send({message: err})
    }
})

router.post('/:auction_id/cancel_auction', verifyToken, async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.auction_id)
        if (!auction) {
            res.status(400).send('That auction does not exist!')
            return;
        }
        const item = await Item.findById(auction.item_id)
        if (item.item_owner.toString() != req.user._id) {
            res.status(400).send('You can only cancel your own auctions.')
            return;
        }
        auction.status = 'cancelled'
        await auction.save()
        res.status(200).send({
            message: 'Auction has been cancelled',
            auction: auction
        })
    } catch (err) {
        res.status(400).send('There has been an error')
    }
})


module.exports = router