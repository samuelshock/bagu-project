'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MapSchema = new Schema({
  latitude: { type: Number },
  longitude: { type: Number },
  zoom:  { type: Number , default : 10},
  isSelected : Boolean
});

module.exports = mongoose.model('Map', MapSchema);