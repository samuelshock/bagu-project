###
Broadcast updates to client when the model changes
###
onSave = (socket, doc, cb) ->
  socket.emit "map:save", doc
onRemove = (socket, doc, cb) ->
  socket.emit "map:remove", doc
"use strict"
Map = require("./map-model")
exports.register = (socket) ->
  Map.schema.post "save", (doc) ->
    onSave socket, doc

  Map.schema.post "remove", (doc) ->
    onRemove socket, doc
