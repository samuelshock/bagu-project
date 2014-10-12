MapModel = require("./map-model")
BaseManager = require '../base-manager'


class MapManager

  constructor: ->
    @mapManager = new BaseManager MapModel

  ###
  Obtains all maps for filter option
  @param filter [Json] options to find
  ###
  getAll: (filter = {}) ->
    @mapManager.find filter

  findById: (id) ->
    @mapManager.findById id

  create: (map) ->
    @mapManager.create map

  update: (newData) ->
    @mapManager.update newData

  delete: (id) ->
    option =
      _id: id
    @mapManager.remove option

module.exports = MapManager