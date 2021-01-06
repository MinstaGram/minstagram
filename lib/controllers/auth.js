const { Router } = require('express');

module.exports = Router()
    .post('/signup', (req, res, next) => {
        User
            .insert(req.blody)
            .then(user => res.send(user))
            .catch(next)
    });
