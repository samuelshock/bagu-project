ArrangementModel = require("./arrangement-model")
BaseManager = require '../base-manager'


class ArrangementManager

  constructor: ->
    @arrangementManager = new BaseManager ArrangementModel

  ###
  Obtains all maps for filter option
  @param filter [Json] options to find
  ###
  getAll: (filter = {}) ->
    @arrangementManager.find filter

  findById: (id) ->
    @arrangementManager.findById id

  create: (map) ->
    @arrangementManager.create map

  update: (newData) ->
    @arrangementManager.update newData

  delete: (id) ->
    option =
      _id: id
    @arrangementManager.remove option

module.exports = ArrangementManager