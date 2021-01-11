const { Router } = require('express');
// const User = require('../models/User.js');
const UserService = require('../services/UserService');
const ensureAuth = require('../middleware/ensure-auth')

module.exports = Router()

// ------------------------------------------------

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
    })

// ------------------------------------------------

    .post('/login', (req, res, next) => {
        UserService
            .authorize(req.body)
            .then(user => {
                res.cookie('session', UserService.authToken(user), {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: 'none'
                });
                res.send(user);
            })
            .catch(next);
    })

// ------------------------------------------------

    .get('/verify', ensureAuth, (req, res) => {
        // console.log(req.user)
        res.send(req.user);
    })