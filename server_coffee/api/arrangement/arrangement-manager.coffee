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

  create: (arrangement) ->
    total_price = arrangement.price * arrangement.days
    arrangement.total_price = total_price
    @arrangementManager.create arrangement

  update: (newData) ->
    @arrangementManager.update newData

  delete: (id) ->
    option =
      _id: id
    @arrangementManager.remove option

module.exports = ArrangementManager