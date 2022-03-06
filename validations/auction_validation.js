const joi = require('joi')

const startAuctionValidation = (data) => {
    const schemaValidation = joi.object({
        item_id: joi.string().required().max(24),
        auction_duration: joi.number().required().min(1).max(30),
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