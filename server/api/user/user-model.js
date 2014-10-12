(function() {
  "use strict";
  var Q, Schema, UserSchema, alertsDoc, authTypes, crypto, mailer, messagesDoc, mongoose, validatePresenceOf;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  crypto = require("crypto");

  authTypes = ["github", "twitter", "facebook", "google"];

  Q = require('q');

  mailer = require('../../mailer/mail');

  messagesDoc = new Schema({
    remitter: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    Date: {
      type: Date,
      "default": Date.now
    },
    message: {
      type: String
    },
    title: {
      type: String
    },
    isRead: {
      type: Boolean,
      "default": false
    }
  });

  alertsDoc = new Schema({
    Date: {
      type: Date,
      "default": Date.now
    },
    type: {
      type: String
    },
    title: {
      type: String
    },
    message: {
      type: String
    }
  });

  UserSchema = new Schema({
    role: {
      type: String,
      "default": "user"
    },
    hashedPassword: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    google: {},
    github: {},
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true
      },
      lowercase: true
    },
    hash: {
      type: String
    },
    publications: [
      {
        type: Schema.Types.ObjectId,
        ref: "publication"
      }
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "publication"
      }
    ],
    registerDate: {
      type: Date,
      "default": Date.now
    },
    profilePhoto: {
      type: String,
      "default": "profile/profile.png"
    },
    messages: [messagesDoc],
    alerts: [alertsDoc],
    pending: {
      type: Boolean,
      "default": false
    }
  });


  /*
  Virtuals
   */

  UserSchema.virtual("password").set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    return this.hashedPassword = this.encryptPassword(password);
  }).get(function() {
    return this._password;
  });

  UserSchema.virtual("profile").get(function() {
    return {
      name: this.name,
      role: this.role
    };
  });

  UserSchema.virtual("token").get(function() {
    return {
      _id: this._id,
      role: this.role
    };
  });


  /*
  Validations
   */

  UserSchema.path("email").validate((function(email) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return email.length;
  }), "Email cannot be blank");

  UserSchema.path("hashedPassword").validate((function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return hashedPassword.length;
  }), "Password cannot be blank");

  UserSchema.path("email").validate((function(value, respond) {
    var self;
    self = this;
    return this.constructor.findOne({
      email: value
    }, function(err, user) {
      if (err) {
        throw err;
      }
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    });
  }), "The specified email address is already in use.");

  validatePresenceOf = function(value) {
    return value && value.length;
  };


  /*
  Pre-save hook
   */

  UserSchema.pre("save", function(next) {
    if (!this.isNew) {
      return next();
    }
    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1) {
      return next(new Error("Invalid password"));
    } else {
      return next();
    }
  });


  /*
  Methods
   */

  UserSchema.methods = {

    /*
    Adds a publication
    
    @param publication [Publication]
     */
    addPublication: function(publication) {
      var deferred;
      deferred = Q.defer();
      this.publications.push(publication._id);
      return this.save(function(error) {
        if (error) {
          deferred.reject(error);
        }
        return deferred.resolve(this);
      });
    },

    /*
    Authenticate - check if the passwords are the same
    
    @param {String} plainText
    @return {Boolean}
    @api public
     */
    authenticate: function(plainText) {
      return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /*
    Make salt
    
    @return {String}
    @api public
     */
    makeSalt: function() {
      return crypto.randomBytes(16).toString("base64");
    },

    /*
    Encrypt password
    
    @param {String} password
    @return {String}
    @api public
     */
    encryptPassword: function(password) {
      var salt;
      if (!password || !this.salt) {
        return "";
      }
      salt = new Buffer(this.salt, "base64");
      return crypto.pbkdf2Sync(password, salt, 10000, 64).toString("base64");
    }
  };

  module.exports = mongoose.model("User", UserSchema);

}).call(this);

//# sourceMappingURL=user-model.js.map
