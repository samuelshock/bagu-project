###
Broadcast updates to client when the model changes
###
onSave = (socket, doc, cb) ->
  socket.emit "place:save", doc
onRemove = (socket, doc, cb) ->
  socket.emit "place:remove", doc

Place = require("./place-model")
exports.register = (socket) ->
  Place.schema.post "save", (doc) ->
    onSave socket, doc

  Place.schema.post "remove", (doc) ->
    onRemove socket, doc
