const express = require('express');
const validateRequestBody = require('../../middlewares/request-body-validator.middleware');
const searchValidationSchemas = require('./search.validation-schemas');
const searchController = require('./search.controller');

const router = express.Router();

/**
 * Route for search requests.
 */
router.post('', validateRequestBody(searchValidationSchemas.searchBodyValidationSchema), searchController.post);

module.exports = router;