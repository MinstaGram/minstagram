require('dotenv').config();
const { Router } = require('express');
const app = express();
app.use(express.json());
const ensureAuth = require('../middleware/ensure-auth')

// POST------------------------ 

module.exports = Router()

.post('/',  async(req, res) => {
    Post 
      .insert(req.body)
      .then(posts => res.send(posts));
  })

//   GET------------------------

.get('/api/v1/get', (req, res) => {
    Post
      .find()
      .then(posts => res.send(posts));
  })

//  GET :id ---------------------

.get('/api/v1/get:id', (req, res) => {
    Post
      .findById(req.params.id)
      .then(posts => res.send(posts));
  })

// PUT ---------------------------

.put('/api/v1/put', (req, res) => {
    Post
      .update(req.params.id, req.body)
      .then(posts => res.send(posts));
  })
  
//  DELETE -----------------------

.delete('/api/v1/delete:id', (req, res) => {
    Post
      .delete(req.params.id)
      .then(posts => res.send(posts));
  })

// --------------------------------

module.exports = app ;
