PlaceModel = require './place-model'
BaseManager = require '../base-manager'

class PlaceManager

  constructor: ->
    @placeManager = new BaseManager PlaceManager

  getAll: (filter = {}) ->
    @placeManager.find filter

  findById: (id) ->
    @placeManager.findById id

  createMap: (map) ->
    @placeManager.create map

  updateMap: (newData) ->
    @placeManager.update newData

  deleteMap: (id) ->
    option =
      _id: id
    @placeManager.remove option

    