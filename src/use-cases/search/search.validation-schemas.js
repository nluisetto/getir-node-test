const joi = require("joi");

/**
 * Date validation regex.
 * Valid format: YYYY-MM-DD
 * @type {RegExp}
 */
const dateValidationPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

/**
 * Validation schema for the search request body.
 * @type {Joi.ObjectSchema<any>}
 */
const searchBodyValidationSchema = joi
    .object({
        startDate: joi.string().regex(dateValidationPattern).required(),
        endDate: joi.string().regex(dateValidationPattern).required(),
        minCount: joi.number().required(),
        maxCount: joi.number().required()
    })
    .required();

module.exports = {
    searchBodyValidationSchema
}