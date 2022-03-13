const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const searchRoutes = require('./use-cases/search/search.routes');
const errorHandler = require('./middlewares/error-handler.middleware')

// Creating Express application instance.
const app = express();

// Add Helmet security middleware.
app.use(helmet());

// Add json body parsing middleware.
app.use(bodyParser.json());

// Registering search related routes.
app.use('/search', searchRoutes);

// Register error handler middleware
app.use(errorHandler());

module.exports = app;