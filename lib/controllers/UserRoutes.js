require('dotenv').config();
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth')
const User = require('../models/User');


module.exports = Router()

// ------------------------ 

// GET /users/popular
// respond with the 10 users with the most total comments on their posts

.get('/popular', (req, res, next) => {
    User
      .findUserPopular()
      .then(users => res.send(users))
      .catch(next);
  })

// ------------------------
// GET /users/prolific
// respond with the 10 users with the most posts
.get('/prolificUser', (req, res, next) => {
    User
      .findProlificUser()
      .then(users => res.send(users))
      .catch(next);
  })


//-------------------------

// GET /users/leader
// respond with the 10 users with the most comments

.get('/leader', (req, res, next) => {
    User
      .findUserLeader()
      .then(users => res.send(users))
      .catch(next);
  })

// --------------------------

// GET /users/impact
// respond with the 10 users with the highest $avg comments per post

.get('/impact', (req, res, next) => {
    User
      .findUserImpact()
      .then(users => res.send(users))
      .catch(next);
  })
