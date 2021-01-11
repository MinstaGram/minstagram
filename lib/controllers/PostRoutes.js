require('dotenv').config();
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth')
const Post = require('../models/Post');


module.exports = Router()

  // -----------------------------------

  .get('/popular', (req, res, next) => {
    Post
      .findPopular()
      .then(posts => res.send(posts))
      .catch(next);

  })

  // ------------------------------------


  .post('/', ensureAuth, (req, res, next) => {
    Post
      .insert(req.body)
      .then(posts => res.send(posts))
      .catch(next);
  })

  // ------------------------------------

  .get('/', (req, res, next) => {
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  })

  // ------------------------------------

  .get('/:id', (req, res, next) => {
    Post
      .findById(req.params.id)
      .then(posts => res.send(posts))
      .catch(next);
  })

  // ------------------------------------

  .put('/:id', ensureAuth, (req, res, next) => {
    Post
      .update(req.params.id, req.body)
      .then(posts => res.send(posts))
      .catch(next);
  })

  // ------------------------------------

  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .delete(req.params.id, req.user.id)
      .then(posts => res.send(posts))
      .catch(next);
  });

