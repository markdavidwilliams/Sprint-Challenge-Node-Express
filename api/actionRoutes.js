const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

// all Actions gets

router.get('/', (req, res) => {
  actionDb
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
        .json({ error: `The action information could not be retrieved.` })
        .end()
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  actionDb
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

// all Actions posts

router.post('/:id', (req, res) => {
  const project_id = req.params.id;
  const description = req.body.description;
  const notes = req.body.notes;
  const completed = req.body.completed;
  const action = { project_id, description, notes, completed };
  if(!(project_id || description)) {
    res
      .status(400)
      .json({ error: `Please provide project ID and action description.` })
      .end()
  } else if (description.length > 128) {
    res
      .status(400)
      .json({ error: `The action description is greater than 128 characters.` })
      .end()
  } else {
    actionDb
      .insert(action)
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: `The action could not be posted.` })
          .end()
      })
  }
})

// all Actions puts

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const notes = req.body.notes;
  const completed = req.body.completed;
  const action = { description, notes, completed };
  if(description.length > 128) {
    res
      .status(400)
      .json({ error: `The action description is greater than 128 characters.` })
      .end()
  } else {
    actionDb
      .update(id, action)
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
          .json({ error: `The action could not be updated.` })
          .end()
      })
  }
})

// all Action deletes

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  actionDb
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
        .json({ error: `The action could not be deleted.` })
        .end()
    })
})

module.exports = router;