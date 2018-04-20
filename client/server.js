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

// needed for CORS I think? but we're not using it, whatever
watchesRoute.options(function(req, res) {
  res.writeHead(200);
  res.end();
});

// needed for CORS I think? but we're not using it, whatever
watchRoute.options(function(req, res) {
  res.writeHead(200);
  res.end();
});




// allows filtering by URL, email
watchesRoute.get((req, res) => {

  let queryParams = {};

  if (req.params.url) {
    queryParams.url = req.params.url;
  }

  if (req.params.email) {
    queryParams.watchers = {
      email: req.params.email
    };
  }

  const query = Watch.find(queryParams);
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

// create da watches
watchesRoute.post((req, res) => {
  if (!req.body.url) return res.status(400).json({
    success: false,
    message: 'URL is required'
  });

  if (!req.body.watchers) return res.status(400).json({
    success: false,
    message: 'watchers are required'
  });

  const url = req.body.url;
  const watchers = req.body.watchers;

  const watch = new Watch({ url, watchers });
  watch.save((err, watch) => {
    if (err) return res.status(500).json({
      success: false,
      message: err
    });

    return res.status(201).json({
      success: true,
      message: 'watch created successfully',
      data: watch
    });
  });
});




// gets one watch row
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

    return res.json({
      success: false,
      message: 'welp, here it is',
      data: watch
    });
  });
});

watchRoute.put((req, res) => {
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

    watch.url = req.body.url || '';
    watch.watchers = req.body.watchers || [];

    watch.save((err, watch) => {
      if (err) return res.status(500).json({
        success: false,
        message: err
      });

      return res.json({
        success: true,
        message: 'watch updated successfully',
        data: watch
      });
    });
  });
});

watchRoute.delete((req, res) => {
  const watchId = req.params.id;

  if (!watchId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).json({
    success: false,
    message: 'watch not found'
  });

  Watch.findByIdAndDelete(watchId, (err, watch) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    if (!watch) return res.status(404).json({
      success: false,
      message: 'watch not found'
    });

    return res.json({
      success: false,
      message: 'watch deleted',
      data: watch
    });
  });
});





// -- SERVE --

app.listen(port);
console.log('Server running on port ' + port);