###
Broadcast updates to client when the model changes
###
onSave = (socket, doc, cb) ->
  socket.emit "arrangement:save", doc
onRemove = (socket, doc, cb) ->
  socket.emit "arrangement:remove", doc


Arrangement = require("./arrangement-model")
exports.register = (socket) ->
  Arrangement.schema.post "save", (doc) ->
    onSave socket, doc

  Arrangement.schema.post "remove", (doc) ->
    onRemove socket, doc
