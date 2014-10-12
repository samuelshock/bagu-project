
/*
Populate DB with sample data on server start
to disable, edit config/environment/index.js, and set `seedDB: false`
 */

(function() {
  var User;

  User = require("../api/user/user-model");

  User.find({}).remove(function() {
    return User.create({
      provider: "local",
      name: "Test User",
      email: "test@test.com",
      password: "test"
    }, {
      provider: "local",
      role: "admin",
      name: "Admin",
      email: "admin@admin.com",
      password: "admin"
    }, function() {
      return console.log("finished populating users");
    });
  });

}).call(this);

//# sourceMappingURL=seed.js.map
