function buildRequestBodyValidatorMiddleware(bodySchema) {
    return async function bodyValidatorMiddleware(req, res, next) {
        try {
            const validationResult = await bodySchema.validateAsync(req.body);
            return next();
        }
        catch (error) {
            // if the error is not related to validation, then continue with the chain
            if (!error.isJoi) {
                return next(error);
            }

            // return a response using the required format
            res.status(400).json({
                code: 400,
                msg: 'The request body is not in the correct format',
                records: []
            });
        }
    }
}

module.exports = buildRequestBodyValidatorMiddleware;