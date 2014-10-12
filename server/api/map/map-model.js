(function() {
  "use strict";
  var MapSchema, Schema, mongoose;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  MapSchema = new Schema({
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    zoom: {
      type: Number,
      "default": 10
    },
    isSelected: Boolean
  });

  module.exports = mongoose.model("Map", MapSchema);

}).call(this);

//# sourceMappingURL=map-model.js.map
