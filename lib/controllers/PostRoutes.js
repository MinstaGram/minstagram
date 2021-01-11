require('dotenv').config();
const { Router } = require('express');
// const app = express();
// app.use(express.json());
const ensureAuth = require('../middleware/ensure-auth')
const Post = require('../models/Post');


// POST------------------------ 

module.exports = Router()

  // GET POPULAR----------------------

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

  // GET------------------------

  .get('/', (req, res, next) => {
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  })

  // GET :id ---------------------

  .get('/:id', (req, res, next) => {
    Post
      .findById(req.params.id)
      .then(posts => res.send(posts))
      .catch(next);
  })

  // PUT ---------------------------

  .put('/:id', ensureAuth, (req, res, next) => {
    Post
      .update(req.params.id, req.body)
      .then(posts => res.send(posts))
      .catch(next);
  })

  //  DELETE -----------------------

  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .delete(req.params.id)
      .then(posts => res.send(posts))
      .catch(next);
  })

