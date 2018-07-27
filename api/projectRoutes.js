const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  projectDb
    .get()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The project information couldn't be retrieved.` })
        .end()
    })
})

module.exports = router;