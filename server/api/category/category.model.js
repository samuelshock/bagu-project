'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String},
  description: { type: String},
  registerDate: { type: Date, default: Date.now },
  image: [{ type: String }]
});

module.exports = mongoose.model('Category', CategorySchema);