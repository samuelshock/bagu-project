/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Arrangement = require('./arrangement.model');

exports.register = function(socket) {
  Arrangement.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Arrangement.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('arrangement:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('arrangement:remove', doc);
}