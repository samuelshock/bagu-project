
/*
Broadcast updates to client when the model changes
 */

(function() {
  var Place, onRemove, onSave;

  onSave = function(socket, doc, cb) {
    return socket.emit("place:save", doc);
  };

  onRemove = function(socket, doc, cb) {
    return socket.emit("place:remove", doc);
  };

  Place = require("./place-model");

  exports.register = function(socket) {
    Place.schema.post("save", function(doc) {
      return onSave(socket, doc);
    });
    return Place.schema.post("remove", function(doc) {
      return onRemove(socket, doc);
    });
  };

}).call(this);

//# sourceMappingURL=place-socket.js.map
