const { Router } = require('express');
// const User = require('../models/User.js');
const UserService = require('../services/UserService');

module.exports = Router()
    .post('/signup', (req, res, next) => {
        UserService
            .create(req.body)
            .then(user => {
                res.cookie('session', UserService.authToken(user), {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: 'none',

                });
                res.send(user);
            })
            .catch(next);
    });

