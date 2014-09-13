/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Publication = require('./publication.model');

exports.register = function(socket) {
  Publication.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Publication.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('publication:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('publication:remove', doc);
}