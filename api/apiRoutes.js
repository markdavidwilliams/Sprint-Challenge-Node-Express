const express = require('express');

const projectRoutes = require('./projectRoutes');
const actionRoutes = require('./actionRoutes');

const api = express.Router();

api.use('/projects', projectRoutes);
api.use('/actions', actionRoutes);

module.exports = api;