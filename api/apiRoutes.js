const express = require('express');

const projectRoutes = require('./projectRoutes');

const api = express.Router();

api.use('/projects', projectRoutes);

module.exports = api;