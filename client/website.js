'use strict';

const mongoose = require('mongoose');

var WebsiteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'an ID is required']
  },
  name: {
    type: String,
    required: [true, 'a name for the website is required']
  }
});

// Export the Mongoose WatchSchema model, named Watch, stored in watches collection
module.exports = mongoose.model('Website', WebsiteSchema, 'websites');
