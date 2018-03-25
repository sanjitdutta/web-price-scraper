'use strict';

const mongoose = require('mongoose');

var WatchSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'URL is required for monitoring']
  },
  watchers: [{
    email: {
      type: String,
      required: [true, 'Email is required for notification']
    },
    targetPrice: {
      type: Number
    } // monitored prices should be stored in a watchData table
  }]
});

// Export the Mongoose WatchSchema model, named Watch, stored in watches collection
module.exports = mongoose.model('Watch', WatchSchema, 'watches');
