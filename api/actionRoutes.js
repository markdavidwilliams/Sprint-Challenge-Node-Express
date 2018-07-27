const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

// all Actions gets

router.get('/', (req, res, next) => {
  actionDb
    .get()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      next({ code: 500 })
    })
})

router.get('/:id', (req, res, next) => {
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
      next({ code: 404 })
    })
})

// all Actions posts

router.post('/:id', (req, res, next) => {
  const project_id = req.params.id;
  const description = req.body.description;
  const notes = req.body.notes;
  const completed = req.body.completed;
  const action = { project_id, description, notes, completed };
  if(!project_id || description.length === 0 || notes.length === 0) {
    next({ code: 400 })
  } else if (description.length > 128) {
    next({ code: 409 })
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
        next({ code: 500 })
      })
  }
})

// all Actions puts

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const description = req.body.description;
  const notes = req.body.notes;
  const completed = req.body.completed;
  const action = { description, notes, completed };
  if(!(description || notes)) {
    next({ code: 400 })
  } else if(description.length > 128) {
    next({ code: 409})
  } else {
    actionDb
      .update(id, action)
      .then(response => {
        if(!response) {
          next({ code: 404 })
        } else {
          res
            .status(200)
            .json(response)
            .end()
        }
      })
      .catch(() => {
        next({ code: 500 })
      })
  }
})

// all Action deletes

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  actionDb
    .remove(id)
    .then(response => {
      if(!response) {
        next({ code: 404 })
      } else {
        res
          .status(200)
          .json({ success: true })
          .end()
      }
    })
    .catch(() => {
      next({ code: 500 })
    })
})

module.exports = router;