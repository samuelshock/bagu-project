CategoryModel = require("./category-model")
BaseManager = require '../base-manager'


class CategoryManager

  constructor: ->
    @categoryManager = new BaseManager CategoryModel

  ###
  Obtains all maps for filter option
  @param filter [Json] options to find
  ###
  getAll: (filter = {}) ->
    @categoryManager.find filter

  findById: (id) ->
    @categoryManager.findById id

  create: (map) ->
    @categoryManager.create map

  update: (newData) ->
    @categoryManager.update newData

  delete: (id) ->
    option =
      _id: id
    @categoryManager.remove option

module.exports = CategoryManager