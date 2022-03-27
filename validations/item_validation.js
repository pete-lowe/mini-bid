const joi = require('joi')

const itemConditionValidation = (data) => {
    const schemaValidation = joi.object({
        item_name: joi.string().required().min(3).max(256),
        item_condition: joi.string().required().valid('new', 'used'),
        item_description: joi.string().required().min(3).max(1024),
    })
    return schemaValidation.validate(data)
}

const itemConditionValidationForSearch = (data) => {
    const schemaValidation = joi.object({
        item_condition: joi.string().required().valid('new', 'used'),
    })
    return schemaValidation.validate(data)
}


module.exports.itemConditionValidation = itemConditionValidation
module.exports.itemConditionValidationForSearch = itemConditionValidationForSearch