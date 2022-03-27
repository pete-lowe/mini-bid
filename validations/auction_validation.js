const joi = require('joi').extend(require('@joi/date'))

const startAuctionValidation = (data) => {
    const schemaValidation = joi.object({
        item_id: joi.string().required().max(24),
        auction_end_date: joi.date().format('DD/MM/YYYY'),
    })
    return schemaValidation.validate(data)
}

const postBidValidation = (data) => {
    const schemaValidation = joi.object({
        bid_amount: joi.number().required().min(0).max(Number.MAX_SAFE_INTEGER)
    })
    return schemaValidation.validate(data)
}



module.exports.startAuctionValidation = startAuctionValidation
module.exports.postBidValidation = postBidValidation