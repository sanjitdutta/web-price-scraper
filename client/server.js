'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'});
const router = express.Router();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const db = process.env.MONGODB_DB;

const Watch = require('./watch');

mongoose.connect('mongodb://' + dbUser + ':' + dbPassword + '@' + db);

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

app.use(express.static('web/dist'));

app.use('/api', router);

const watchesRoute = router.route('/watches');
const watchRoute = router.route('/watch/:id');

// -- ROUTES --

watchesRoute.get((req, res) => {

  const query = Watch.find({});
  query.exec((err, watches) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    res.json({
      success: true,
      message: 'welp, here it is',
      data: watches
    });
  });
});

watchRoute.get((req, res) => {

  const watchId = req.params.id;

  if (!watchId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).json({
    success: false,
    message: 'watch not found'
  });

  Watch.findById(watchId, (err, watch) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    if (!watch) return res.status(404).json({
      success: false,
      message: 'watch not found'
    });

    return res.status(404).json({
      success: false,
      message: 'welp, here it is',
      data: watch
    });
  });
});

app.listen(port);
console.log('Server running on port ' + port);
