(function() {
  "use strict";
  var PlaceSchema, Schema, mongoose;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  PlaceSchema = new Schema({
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    sites: [
      {
        type: String
      }
    ],
    info: String,
    active: Boolean
  });

  module.exports = mongoose.model("Place", PlaceSchema);

}).call(this);

//# sourceMappingURL=place-model.js.map
