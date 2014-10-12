(function() {
  var PublicationSchema, Schema, commentSchema, mongoose, starsSchema;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  commentSchema = new Schema({
    comment: {
      type: String
    },
    registerDate: {
      type: Date,
      "default": Date.now
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  });

  starsSchema = new Schema({
    votes: {
      type: Number
    },
    registerDate: {
      type: Date,
      "default": Date.now
    }
  });

  PublicationSchema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    web_site: {
      type: String
    },
    phone: {
      type: String,
      required: true
    },
    tags: [
      {
        type: String
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    map: {
      type: Schema.Types.ObjectId,
      ref: "Map"
    },
    stars: [starsSchema],
    comments: [commentSchema],
    images: [
      {
        type: String,
        "default": "place.jpg"
      }
    ],
    date: {
      type: Date,
      "default": Date.now
    },
    isActive: Boolean,
    city: {
      type: String,
      lowercase: true,
      required: true
    },
    province: {
      type: String
    },
    visits: {
      type: Number
    },
    priority: {
      type: Number,
      "default": 3
    },
    arrangement: {
      type: Schema.Types.ObjectId,
      ref: 'Arrangement'
    }
  });

  module.exports = mongoose.model("Publication", PublicationSchema);

}).call(this);

//# sourceMappingURL=publication-model.js.map
