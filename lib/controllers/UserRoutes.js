require('dotenv').config();
const { Router } = require('express');
const User = require('../models/User');


module.exports = Router()

// ------------------------ 

.get('/popular', (req, res, next) => {
    User
      .findUserPopular()
      .then(users => res.send(users))
      .catch(next);
  })

// ------------------------

.get('/prolificUser', (req, res, next) => {
    User
      .findProlificUser()
      .then(users => res.send(users))
      .catch(next);
  });


