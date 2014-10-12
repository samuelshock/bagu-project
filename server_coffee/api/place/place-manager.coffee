PlaceModel = require './place-model'
BaseManager = require '../base-manager'

class PlaceManager

  constructor: ->
    @placeManager = new BaseManager PlaceModel

  getAll: (filter = {}) ->
    @placeManager.find filter

  findById: (id) ->
    @placeManager.findById id

  create: (map) ->
    @placeManager.create map

  update: (newData) ->
    @placeManager.update newData

  delete: (id) ->
    option =
      _id: id
    @placeManager.remove option

module.exports = PlaceManager

    