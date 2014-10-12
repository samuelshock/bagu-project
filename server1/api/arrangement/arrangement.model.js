'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArrangementSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Arrangement', ArrangementSchema);