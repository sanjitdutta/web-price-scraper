'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const router = express.Router();

// Create our Express application
const app = express();

// Use environment defined port or 4000
const port = process.env.PORT || 4000;

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// this does something?
app.use(bodyParser.json());
app.use(bodyParser());

app.use('/', router);

const homeRoute = router.route('/');
// const watchesRoute = router.route('/api/watches');
// const watchRoute = router.route('/api/watch/:id');

homeRoute.get((req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);
console.log('Server running on port ' + port);
