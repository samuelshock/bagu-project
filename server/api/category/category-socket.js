
/*
Broadcast updates to client when the model changes
 */

(function() {
  var Category, onRemove, onSave;

  onSave = function(socket, doc, cb) {
    return socket.emit("category:save", doc);
  };

  onRemove = function(socket, doc, cb) {
    return socket.emit("category:remove", doc);
  };

  Category = require("./category-model");

  exports.register = function(socket) {
    Category.schema.post("save", function(doc) {
      return onSave(socket, doc);
    });
    return Category.schema.post("remove", function(doc) {
      return onRemove(socket, doc);
    });
  };

}).call(this);

//# sourceMappingURL=category-socket.js.map
