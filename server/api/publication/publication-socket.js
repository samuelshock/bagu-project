
/*
Broadcast updates to client when the model changes
 */

(function() {
  var Publication, onRemove, onSave;

  onSave = function(socket, doc, cb) {
    return socket.emit("publication:save", doc);
  };

  onRemove = function(socket, doc, cb) {
    return socket.emit("publication:remove", doc);
  };

  Publication = require("./publication-model");

  exports.register = function(socket) {
    Publication.schema.post("save", function(doc) {
      return onSave(socket, doc);
    });
    return Publication.schema.post("remove", function(doc) {
      return onRemove(socket, doc);
    });
  };

}).call(this);

//# sourceMappingURL=publication-socket.js.map
