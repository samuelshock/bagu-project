###
Broadcast updates to client when the model changes
###
onSave = (socket, doc, cb) ->
  socket.emit "publication:save", doc
onRemove = (socket, doc, cb) ->
  socket.emit "publication:remove", doc

Publication = require("./publication.model")
exports.register = (socket) ->
  Publication.schema.post "save", (doc) ->
    onSave socket, doc

  Publication.schema.post "remove", (doc) ->
    onRemove socket, doc
