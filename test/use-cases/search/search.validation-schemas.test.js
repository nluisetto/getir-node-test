const { searchBodyValidationSchema } = require('../../../src/use-cases/search/search.validation-schemas');

describe('search request body validation schema', () => {

    it('should raise error if startDate is not a string with YYYY-MM-DD pattern', async () => {
        try {
            await searchBodyValidationSchema.validateAsync({
                startDate: 'NOT VALID',
                endDate: '1999-01-01',
                minCount: 1,
                maxCount: 5
            });

            // raise error if the tested unit do not raise error as expected
            expect(0).toEqual(1);
        }
        catch (error) {
            expect(error.details[0].context.key).toEqual('startDate');
        }
    });

    it('should raise error if endDate is not a string with YYYY-MM-DD pattern', async () => {
        try {
            await searchBodyValidationSchema.validateAsync({
                startDate: '1999-01-01',
                endDate: 'NOT VALID',
                minCount: 1,
                maxCount: 5
            });

            // raise error if the tested unit do not raise error as expected
            expect(0).toEqual(1);
        }
        catch (error) {
            expect(error.details[0].context.key).toEqual('endDate');
        }
    });

    it('should raise error if minCount is not a number', async () => {
        try {
            await searchBodyValidationSchema.validateAsync({
                startDate: '1999-01-01',
                endDate: '1999-01-01',
                minCount: 'NOT VALID',
                maxCount: 100
            });

            // raise error if the tested unit do not raise error as expected
            expect(0).toEqual(1);
        }
        catch (error) {
            expect(error.details[0].context.key).toEqual('minCount');
        }
    });

    it('should raise error if maxCount is not a number', async () => {
        try {
            await searchBodyValidationSchema.validateAsync({
                startDate: '1999-01-01',
                endDate: '1999-01-01',
                minCount: 1,
                maxCount: 'NOT VALID'
            });

            // raise error if the tested unit do not raise error as expected
            expect(0).toEqual(1);
        }
        catch (error) {
            expect(error.details[0].context.key).toEqual('maxCount');
        }
    });

});