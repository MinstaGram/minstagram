require('dotenv').config();
const ensureAuth = require('../middleware/ensure-auth')
const { Router } = require('express');
const Comment = require('../models/Comment');
module.exports = Router()

  // --------------------------------------------

  .post('/', ensureAuth, (req, res, next) => {
    Comment
      .insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })

// ------------------------------------------------

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });







