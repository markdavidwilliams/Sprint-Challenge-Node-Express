const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());

// all Project get requests
router.get('/', (req, res, next) => {
  projectDb
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
    projectDb
      .get(id)
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(err => {
        next({ code: 404 })
      })
})

router.get('/:id/actions', (req, res, next) => {
  const id = req.params.id;
  projectDb
    .getProjectActions(id)
    .then(response => {
      if(!response[0]) {
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
})

// all Project post request

router.post('/', (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const project = { name, description, completed };
  if(!(name || description)) {
    next({ code: 400 });
  } else if(name.length > 128) {
    next({ code: 409 });
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
        next({ code: 500 })
      })
  }
})

// all Project puts

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const project = { name, description, completed };
  if(!(name || description)) {
    next({ code: 400 })
  } else if(name.length > 128) {
    next({ code: 409 })
  } else {
    projectDb
      .update(id, project)
      .then(response => {
        if(!response) {
          next({ code: 404 });
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

// all Project deletes

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  projectDb
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