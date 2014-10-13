(function() {
  var BaseManager, UserManager, UserModel;

  UserModel = require('./user-model');

  BaseManager = require('../base-manager');

  UserManager = (function() {
    function UserManager() {
      this.userManager = new BaseManager(UserModel);
    }

    UserManager.prototype.getAll = function(filter) {
      if (filter == null) {
        filter = {};
      }
      return this.userManager.find(filter);
    };

    UserManager.prototype.findById = function(id) {
      return this.userManager.findById(id);
    };

    UserManager.prototype.create = function(map) {
      return this.userManager.create(map);
    };

    UserManager.prototype.update = function(newData) {
      return this.userManager.update(newData);
    };

    UserManager.prototype["delete"] = function(id) {
      var option;
      option = {
        _id: id
      };
      return this.userManager.remove(option);
    };

    return UserManager;

  })();

  module.exports = UserManager;

}).call(this);

//# sourceMappingURL=user-manager.js.map
