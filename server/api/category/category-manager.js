(function() {
  var BaseManager, CategoryManager, CategoryModel;

  CategoryModel = require("./category-model");

  BaseManager = require('../base-manager');

  CategoryManager = (function() {
    function CategoryManager() {
      this.categoryManager = new BaseManager(CategoryModel);
    }


    /*
    Obtains all maps for filter option
    @param filter [Json] options to find
     */

    CategoryManager.prototype.getAll = function(filter) {
      if (filter == null) {
        filter = {};
      }
      return this.categoryManager.find(filter);
    };

    CategoryManager.prototype.findById = function(id) {
      return this.categoryManager.findById(id);
    };

    CategoryManager.prototype.create = function(map) {
      return this.categoryManager.create(map);
    };

    CategoryManager.prototype.update = function(newData) {
      return this.categoryManager.update(newData);
    };

    CategoryManager.prototype["delete"] = function(id) {
      var option;
      option = {
        _id: id
      };
      return this.categoryManager.remove(option);
    };

    return CategoryManager;

  })();

  module.exports = CategoryManager;

}).call(this);

//# sourceMappingURL=category-manager.js.map
