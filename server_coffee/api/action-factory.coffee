Map = require '../lib/map'

actionsMap =
  "map":
    "ClassAction": "./map/map-manager"
  "publication":
    "ClassAction": "./publication/publication-manager"
  "user":
    "ClassAction": "./user/user-manager"
  "category":
    "ClassAction": "./category/category-manager"
  "arrangement":
    "ClassAction": "./arrangement/arrangement-manager"
  "place":
    "ClassAction": "./place/place-manager"

###
Gets instance of an action
###
class ActionFactory

  @actionsInstance = new Map()

  ###
  Gets an specific action instance
  @param action [String] name of action to instance
  @return [Object] returns an instance of an action
  ###
  @getActionInstance: (action) ->
    if @actionsInstance.exists(action)
      return @actionsInstance.get action
    else
      actionClass = @getActionClass action
      if actionClass?
        instance = new actionClass()
        @actionsInstance.set action, instance
        return instance
    return null

  ###
  Gets an specific action class
  @param action [String] name of action to instance
  @return [Object] returns a class of an action
  ###
  @getActionClass: (action) ->
    if actionsMap[action]?
      actionClass = require actionsMap[action].ClassAction
      return actionClass
    else
      return null

module.exports = ActionFactory