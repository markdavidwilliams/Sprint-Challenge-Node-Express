const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());

//all Project get requests
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

router.get('/:id', (req, res) => {
  const id = req.params.id;
    projectDb
      .get(id)
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        res
          .status(404)
          .json({ error: `The specified ID does not exist.` })
          .end()
      })
})

router.get('/:id/actions', (req, res) => {
  const id = req.params.id;
  projectDb
    .getProjectActions(id)
    .then(response => {
      if(!response[0]) {
        res
          .status(404)
          .json({ error: `The specified ID does not exist.` })
          .end()
      } else {
        res
          .status(200)
          .json(response)
          .end()
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The information could not be retrieved.` })
        .end()
    })
})

// all Project post request

router.post('/', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const project = { name, description, completed };
  if(!(name || description)) {
    res
      .status(400)
      .json({ error: `Please provide a name and description.` })
      .end()
  } else if(name.length > 128) {
    res
      .status(400)
      .json({ error: `The project name provided is greater than 128 characters.` })
      .end()
  } else {
    projectDb
      .insert(project)
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: `The project could not be posted.` })
          .end()
      })
  }
})

// all Project puts

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const project = { name, description, completed };
  if(name.length > 128) {
    res
      .status(400)
      .json({ error: `The project name provided is greater than 128 characters.` })
      .end()
  } else {
    projectDb
      .update(id, project)
      .then(response => {
        if(!response) {
          res
            .status(404)
            .json({ error: `The specified ID does not exist.` })
            .end()
        } else {
          res
            .status(200)
            .json(response)
            .end()
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: `The project could not be updated.` })
          .end()
      })
  }
})

// all Project deletes

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  projectDb
    .remove(id)
    .then(response => {
      if(!response) {
        res
          .status(404)
          .json({ error: `The specified ID does not exist.` })
          .end()
      } else {
        res
          .status(200)
          .json({ success: true })
          .end()
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The project could not be deleted.` })
        .end()
    })
})

module.exports = router;