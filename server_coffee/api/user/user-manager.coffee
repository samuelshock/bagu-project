UserModel = require './user-model'
BaseManager = require '../base-manager'

class UserManager

  constructor: ->
    @userManager = new BaseManager UserModel

  getAll: (filter = {}) ->
    @userManager.find filter

  findById: (id) ->
    @userManager.findById id

  create: (map) ->
    @userManager.create map

  update: (newData) ->
    @userManager.update newData

  delete: (id) ->
    option =
      _id: id
    @userManager.remove option

module.exports = UserManager

