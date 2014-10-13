(function() {
  var User, UserManager, actionFactory, config, jwt, mailer, passport, responseHandler, validationError;

  User = require("./user-model");

  passport = require("passport");

  config = require("../../config/environment");

  jwt = require("jsonwebtoken");

  mailer = require("../../mailer/mail");

  actionFactory = require('../action-factory');

  UserManager = actionFactory.getActionInstance('user');

  responseHandler = require('../response-handler');

  validationError = function(res, err) {
    return res.json(422, err);
  };


  /*
  Get list of users
  restriction: 'admin'
   */

  exports.index = function(req, res) {
    return User.find({}, "-salt -hashedPassword", function(err, users) {
      if (err) {
        return res.send(500, err);
      }
      return res.json(200, users);
    });
  };


  /*
  Creates a new user
   */

  exports.create = function(req, res, next) {
    var newUser;
    newUser = new User(req.body);
    newUser.provider = "local";
    newUser.role = "user";
    return newUser.save(function(err, user) {
      var email, from, params, subject, token;
      if (err) {
        return validationError(res, err);
      }
      email = newUser.email;
      subject = "Tagui: Complete Sign up  ✔";
      from = "Bagu Admin ✔ <tagui.services@outlook.com>";
      params = {
        userInfo: {
          url: "localhost:9000",
          message: "Gracias por registrarte a la pagina mas grande de Bolivia donde puedes" + "encontrar lo que tu necesitas para salir restaurants ,hoteles ,puestos de comida" + "y muchos lugares mas."
        }
      };
      setTimeout((function() {
        return mailer.readTemplate("invite-template.jade", params, function(html) {
          return mailer.sendMail(from, email, subject, html, function(error, response) {
            if (error) {
              console.log("notify client side that there are an error send  email");
              return console.error(error);
            } else {
              return console.log("notify client side that there are a success send  email ");
            }
          });
        });
      }), 100);
      token = jwt.sign({
        _id: user._id
      }, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      return res.json({
        token: token
      });
    });
  };


  /*
  Get a single user
   */

  exports.show = function(req, res, next) {
    var userId;
    userId = req.params.id;
    return User.findById(userId, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(401);
      }
      return res.json(user.profile);
    });
  };


  /*
  Deletes a user
  restriction: 'admin'
   */

  exports.destroy = function(req, res) {
    return User.findByIdAndRemove(req.params.id, function(err, user) {
      if (err) {
        return res.send(500, err);
      }
      return res.send(204);
    });
  };


  /*
  Change a users password
   */

  exports.changePassword = function(req, res, next) {
    var newPass, oldPass, userId;
    userId = req.user._id;
    oldPass = String(req.body.oldPassword);
    newPass = String(req.body.newPassword);
    return User.findById(userId, function(err, user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save(function(err) {
          if (err) {
            return validationError(res, err);
          }
          return res.send(200);
        });
      } else {
        return res.send(403);
      }
    });
  };


  /*
  Get my info
   */

  exports.me = function(req, res, next) {
    var userId;
    userId = req.user._id;
    return User.findOne({
      _id: userId
    }, "-salt -hashedPassword", function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(401);
      }
      return res.json(user);
    });
  };


  /*
  Authentication callback
   */

  exports.authCallback = function(req, res, next) {
    return res.redirect("/");
  };


  /*
  Update User
   */

  exports.update = function(req, res, next) {
    if (!req.body._id) {
      req.body._id = req.params.id;
    }
    return UserManager.update(req.body).then((function(_this) {
      return function(result) {
        return responseHandler.handleSuccess(res, result);
      };
    })(this)).fail((function(_this) {
      return function(err) {
        return responseHandler.handleError(res, err);
      };
    })(this));
  };

}).call(this);

//# sourceMappingURL=user-controller.js.map
