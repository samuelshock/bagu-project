###
Broadcast updates to client when the model changes
###
onSave = (socket, doc, cb) ->
  socket.emit "thing:save", doc
onRemove = (socket, doc, cb) ->
  socket.emit "thing:remove", doc
"use strict"
thing = require("./thing-model")
exports.register = (socket) ->
  thing.schema.post "save", (doc) ->
    onSave socket, doc

  thing.schema.post "remove", (doc) ->
    onRemove socket, doc
