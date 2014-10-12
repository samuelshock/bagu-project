(function() {
  var ActionFactory, Map, actionsMap;

  Map = require('../lib/map');

  actionsMap = {
    "map": {
      "ClassAction": "./map/map-manager"
    },
    "publication": {
      "ClassAction": "./publication/publication-manager"
    },
    "category": {
      "ClassAction": "./category/category-manager"
    },
    "arrangement": {
      "ClassAction": "./arrangement/arrangement-manager"
    },
    "place": {
      "ClassAction": "./place/place-manager"
    }
  };


  /*
  Gets instance of an action
   */

  ActionFactory = (function() {
    function ActionFactory() {}

    ActionFactory.actionsInstance = new Map();


    /*
    Gets an specific action instance
    @param action [String] name of action to instance
    @return [Object] returns an instance of an action
     */

    ActionFactory.getActionInstance = function(action) {
      var actionClass, instance;
      if (this.actionsInstance.exists(action)) {
        return this.actionsInstance.get(action);
      } else {
        actionClass = this.getActionClass(action);
        if (actionClass != null) {
          instance = new actionClass();
          this.actionsInstance.set(action, instance);
          return instance;
        }
      }
      return null;
    };


    /*
    Gets an specific action class
    @param action [String] name of action to instance
    @return [Object] returns a class of an action
     */

    ActionFactory.getActionClass = function(action) {
      var actionClass;
      if (actionsMap[action] != null) {
        actionClass = require(actionsMap[action].ClassAction);
        return actionClass;
      } else {
        return null;
      }
    };

    return ActionFactory;

  })();

  module.exports = ActionFactory;

}).call(this);

//# sourceMappingURL=action-factory.js.map
