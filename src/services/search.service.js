const mongoDatasource = require('../data/mongo.datasource');

/**
 * Use the mongo datasource to retrieve records filtered by creation date and then refine the result
 * by filtering by the total count value.
 * @param startDate date used to apply filter to createdAt attribute
 * @param endDate date used to apply filter to createdAt attribute
 * @param minCount number used to apply filter to createdAt attribute
 * @param maxCount number used to apply filter on the aggregate count attribute
 * @returns {Promise<*[]>} an Array with the matching records
 */
async function search(startDate, endDate, minCount, maxCount) {
    const results = await mongoDatasource.search(startDate, endDate);

    results
        .forEach((doc) => doc.totalCount = doc.counts.reduce(sum, 0));

    return results
        .filter((doc) => {
            return doc.totalCount > minCount && doc.totalCount < maxCount;
        });
}

module.exports = {
    search
};



function sum(a, b) {
    return a + b;
}