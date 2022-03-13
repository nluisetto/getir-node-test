/**
 * In case of unhandled error create an error response that respect the response format requirements.
 * @returns {(function(*, *, *, *): (*|undefined))|*}
 */
function buildErrorHandlerMiddleware() {
    return function errorHandlerMiddleware(err, req, res, next) {
        console.error(err);

        // Let express handle the error if it occurred after the response started being sent.
        if (res.headersSent) {
            return next(err)
        }

        // Return error with the proper response format.
        res.status(500).json({
            code: 1,
            msg: 'The server encountered an unexpected error',
            records: []
        }).end();
    }
}

 module.exports = buildErrorHandlerMiddleware;