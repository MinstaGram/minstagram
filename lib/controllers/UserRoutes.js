require('dotenv').config();
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth')
const Post = require('../models/Post');
const Comments = require('../models/Comment');

module.exports = Router()

// ------------------------ 

// GET /users/popular
// respond with the 10 users with the most total comments on their posts

.get('/popular', (req, res, next) => {
    Post
      .findPopular()
      .then(posts => res.send(posts))
      .catch(next);
  })

// ------------------------

// GET /users/prolific
// respond with the 10 users with the most posts

.get('/prolific', (req, res, next) => {
    Post
      .findProlific()
      .then(posts => res.send(posts))
      .catch(next);
  })

// -------------------------

// GET /users/leader
// respond with the 10 users with the most comments

.get('/leader', (req, res, next) => {
    Post
      .findLeader()
      .then(posts => res.send(posts))
      .catch(next);
  })

// --------------------------

// GET /users/impact
// respond with the 10 users with the highest $avg comments per post

.get('/impact', (req, res, next) => {
    Post
      .findImpact()
      .then(posts => res.send(posts))
      .catch(next);
  })
