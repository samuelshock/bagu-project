
/*
Broadcast updates to client when the model changes
 */

(function() {
  var Arrangement, onRemove, onSave;

  onSave = function(socket, doc, cb) {
    return socket.emit("arrangement:save", doc);
  };

  onRemove = function(socket, doc, cb) {
    return socket.emit("arrangement:remove", doc);
  };

  Arrangement = require("./arrangement-model");

  exports.register = function(socket) {
    Arrangement.schema.post("save", function(doc) {
      return onSave(socket, doc);
    });
    return Arrangement.schema.post("remove", function(doc) {
      return onRemove(socket, doc);
    });
  };

}).call(this);

//# sourceMappingURL=arrangement-socket.js.map
