const express = require('express')
const router = express.Router()

var mongoose = require('mongoose');

const Item = require('../models/Item');
const User = require('../models/User');
const verifyToken = require('../verifyToken')
const {itemConditionValidation} = require('../validations/item_validation')

router.get('/:_id', verifyToken, async (req, res) => {
    try {
        const items = await Item.findById(req.params._id)
        if (!items) {
            res.send('That item does not exist')
        }
        res.send(items)
    } catch (err) {
        res.status(400).send({message:err})
    }
})

router.get('/condition/:item_condition', verifyToken, async (req, res) => {
    try {
        const items = await Item.find({item_condition: req.params.item_condition})
        res.send(items)
    } catch (err) {
        res.status(400).send({message:err})
    }
})

router.delete('/:_id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.user._id})
    try {
        if (user.is_admin) {
            const itemToDelete = await Item.deleteOne({_id: req.params._id})
            res.send({message: 'item successfully deleted'})

        } else {
            res.status(400).send({message: 'Only administrators can delete items.'})
        }
    } catch (err) {
        res.status(400).send({message:err})
    }
} )

router.post('/add_item', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.user._id})
    var id = new mongoose.Types.ObjectId();

    const item = new Item({
        _id: id,
        item_name: req.body.item_name,
        date_created: Date.now(),
        item_condition: req.body.item_condition,
        item_description: req.body.item_description,
        item_owner: user._id, 
        in_auction: false
    })

    try {
        const {error} = itemConditionValidation(req.body)
        if (error) {
            res.status(400).send({message:'The options for item_condition are \'new\' and \'used\'.'})
        } else {
            const itemToSave = await item.save()
            res.send({message:'Item added successfully',
                      item: item})
        }
    } catch (err) {
    res.status(400).send({error: 'Something went wrong!'})
    }
})

module.exports = router