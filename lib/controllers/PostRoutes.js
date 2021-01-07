require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
impor

// POST------------------------ 

app.post('/api/v1/auth/post', async(req, res) => {
    Post 
      .insert(req.body)
      .then(post => res.send(post));
  });

//   GET------------------------

app.get('/api/v1/auth/post', (req, res) => {
    Post
      .find()
      .then(modelS => res.send(modelS));
  });

//  GET :id ---------------------

app.get('/api/v1/auth/post', (req, res) => {
    Post
      .findById(req.params.id)
      .then(modelS => res.send(modelS));
  });

// PUT ---------------------------

app.put('/api/v1/auth/post', (req, res) => {
    Post
      .update(req.params.id, req.body)
      .then(modelS => res.send(modelS));
  });
  
//  DELETE -----------------------

app.delete('/api/v1/auth/post, (req, res) => {
    Post
      .delete(req.params.id)
      .then(modelS => res.send(modelS));
  }); 

// --------------------------------

module.exports = app ;
