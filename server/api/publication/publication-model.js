(function() {
  var PublicationSchema, SHA256, Schema, commentSchema, mongoose, plan, starsCalc, starsSchema;

  mongoose = require("mongoose");

  SHA256 = require('crypto-js/sha256');

  Schema = mongoose.Schema;

  commentSchema = new Schema({
    comment: {
      type: String,
      trim: true
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

  plan = new Schema({
    arrangement: {
      type: Schema.Types.ObjectId,
      ref: "Arrangement"
    },
    register_date: {
      type: Date,
      "default": new Date()
    },
    activation_hash: {
      type: String,
      "default": SHA256("" + this.register_date + this.arrangement)
    },
    activation_date: {
      type: Date
    },
    end_date: {
      type: Date
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
      trim: true,
      unique: true,
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
      trim: true,
      unique: true,
      required: true
    },
    web_site: {
      type: String
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    tags: [
      {
        type: String,
        trim: true,
        unique: true
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
    rating: Number,
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
    isActive: {
      type: Boolean,
      "default": false
    },
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
    arrangement: [plan]
  });

  starsCalc = function(stars) {
    console.log(stars);
    var count, n, prom, _i, _len;
    prom = stars.length;
    if (prom <= 0) {
      return 1;
    } else {
      count = 0;
      for (_i = 0, _len = stars.length; _i < _len; _i++) {
        n = stars[_i].votes;
        count += n;
      }
      console.log(count);
      console.log(prom);
      console.log(count / prom);
      return count / prom;
    }
    return 1;
  };

  PublicationSchema.pre("save", function(next) {
    this.rating = starsCalc(this.stars);
    return next();
  });

  module.exports = mongoose.model("Publication", PublicationSchema);

}).call(this);

//# sourceMappingURL=publication-model.js.map
