
/*
Broadcast updates to client when the model changes
 */

(function() {
  var Map, onRemove, onSave;

  onSave = function(socket, doc, cb) {
    return socket.emit("map:save", doc);
  };

  onRemove = function(socket, doc, cb) {
    return socket.emit("map:remove", doc);
  };

  "use strict";

  Map = require("./map-model");

  exports.register = function(socket) {
    Map.schema.post("save", function(doc) {
      return onSave(socket, doc);
    });
    return Map.schema.post("remove", function(doc) {
      return onRemove(socket, doc);
    });
  };

}).call(this);

//# sourceMappingURL=map-socket.js.map
