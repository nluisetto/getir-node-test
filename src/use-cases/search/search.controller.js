const searchService = require('../../services/search.service');

/**
 * Handle POST /search requests.
 * Parse the arguments and serialize response; the actual work is delegated to the search service.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function post(req, res, next) {
    try {
        const body = req.body;

        const startDate = new Date(Date.parse(body.startDate));
        const endDate = new Date(Date.parse(body.endDate));
        const minCount = parseInt(body.minCount);
        const maxCount = parseInt(body.maxCount);

        const searchResult = await searchService
            .search(startDate, endDate, minCount, maxCount);

        res.status(200).json({
            code: 0,
            msg: 'Success',
            records: searchResult.map(toResponseDto)
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    post
};


/**
 * Convert the given document to the expected format for the response.
 * @param document
 * @returns {{createdAt: ({$gte: *, $lt: *}|*), totalCount: *, key}}
 */
function toResponseDto(document) {
    return {
        key: document.key,
        createdAt: document.createdAt,
        totalCount: document.totalCount
    };
}