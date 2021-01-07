const { Router } = require('express');
const UserService = require('../services/UserService.js');

module.exports = Router()
    .post('/', (req, res, next) => {
        UserService
            .authorize(req.body)

    })



