const express = require('express');
const apiRoutes = require('./api/apiRoutes');
// const errorHandling = require('./api/errorHandling');

const server = express();

server.use('/api', apiRoutes);
server.use((err, req, res, next) => {
  switch (err.code) {
    case 400:
      res
        .status(400)
        .json({ error: `Please provide all required information.` })
        .end()
    case 404:
      res
        .status(404)
        .json({ error: `The specified ID does not exist.` })
        .end()
    case 409:
      res
        .status(409)
        .json({ error: `The text provided is greater than 128 characters.` })
        .end()
    default:
      res
        .status(500)
        .json({ error: `The operation could not be performed.` })
        .end()
  }
});

server.listen(8000, () => console.log(`API running on port 8000`));