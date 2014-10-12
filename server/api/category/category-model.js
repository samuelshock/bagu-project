(function() {
  var CategorySchema, Schema, mongoose;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  CategorySchema = new Schema({
    name: {
      type: String
    },
    description: {
      type: String
    },
    registerDate: {
      type: Date,
      "default": Date.now
    },
    image: [
      {
        type: String
      }
    ]
  });

  module.exports = mongoose.model("Category", CategorySchema);

}).call(this);

//# sourceMappingURL=category-model.js.map
