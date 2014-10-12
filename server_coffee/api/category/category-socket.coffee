###
Broadcast updates to client when the model changes
###
onSave = (socket, doc, cb) ->
  socket.emit "category:save", doc
onRemove = (socket, doc, cb) ->
  socket.emit "category:remove", doc


Category = require("./category-model")
exports.register = (socket) ->
  Category.schema.post "save", (doc) ->
    onSave socket, doc

  Category.schema.post "remove", (doc) ->
    onRemove socket, doc
