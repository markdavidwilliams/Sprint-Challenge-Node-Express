const express = require('express');
const apiRoutes = require('./api/apiRoutes');

const server = express();

server.use('/api', apiRoutes);

server.listen(8000, () => console.log(`API running on port 8000`));