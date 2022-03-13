const {MongoClient} = require("mongodb");
const mongoConfig = require('../configs/mongo.config');

/**
 * Return all documents of the 'records' collection that have been created in the period specified by the given dates.
 * @param startDate date used to apply filter to createdAt document value
 * @param endDate date used to apply filter to createdAt document value
 * @returns {Promise<*[]>} an Array with the matching documents
 */
// TODO: implement range filter for totalCount aggregate that now is implemented in search.service.js
async function searchByCreationDate(startDate, endDate) {
    try {
        const client = new MongoClient(mongoConfig.url);

        await client.connect();
        const query = { createdAt: { $gte: startDate, $lt: endDate } };

        const resultCursor = client.db().collection('records').find(query);

        const result = [];

        for await (const doc of resultCursor) {
            result.push(doc);
        }

        return result;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    search: searchByCreationDate
}