
/*
Requires Q to create promises
 */

(function() {
  var DataManager, Q;

  Q = require('q');


  /*
  Handles basic operations with data base
   */

  DataManager = (function() {

    /*
    Sets mongoose instance and sets the model to use
    @param mongoose [Mongoose] instance of the Mongoose data base
    @param dataModel [Model] mongoose model
     */
    function DataManager(dataModel) {
      this.model = dataModel;
    }


    /*
    Creates a new item on data base
    @param item [Object] the item to save
    @return [Promise] promise to be handle
     */

    DataManager.prototype.create = function(item) {
      var deferred;
      deferred = Q.defer();
      this.model.create(item, function(error, data) {
        if (error) {
          return deferred.reject(error);
        } else {
          return deferred.resolve(data);
        }
      });
      return deferred.promise;
    };


    /*
    Finds items on data base
    @param filter [Object] JSON that filters the information of the search
    @return [Promise] promise to be handle
     */

    DataManager.prototype.find = function(filter) {
      var deferred, query, sortBy;
      deferred = Q.defer();
      if (filter.hasOwnProperty('sortBy')) {
        sortBy = filter.sortBy;
        delete filter['sortBy'];
        query = this.model.find(filter);
        query.sort(sortBy);
        query.exec(function(error, data) {
          if (error) {
            return deferred.reject(error);
          } else {
            return deferred.resolve(data);
          }
        });
      } else {
        this.model.find(filter, function(error, data) {
          if (error) {
            return deferred.reject(error);
          } else {
            return deferred.resolve(data);
          }
        });
      }
      return deferred.promise;
    };


    /*
    Finds an item on data base by its Id
    @param id [String] Id of the item
    @return [Promise] promise to be handle
     */

    DataManager.prototype.findById = function(id) {
      var deferred;
      deferred = Q.defer();
      this.model.findById(id, function(error, data) {
        if (error) {
          return deferred.reject(error);
        } else {
          if (id == null) {
            return deferred.reject({
              errorCode: 5,
              message: 'Invalid identifier'
            });
          } else {
            return deferred.resolve(data);
          }
        }
      });
      return deferred.promise;
    };


    /*
    Finds one item on data base
    @param filter [Object] JSON that filters the information of the search
    @return [Promise] promise to be handle
     */

    DataManager.prototype.findOne = function(filter) {
      var deferred;
      deferred = Q.defer();
      this.model.findOne(filter, function(error, data) {
        if (error) {
          return deferred.reject(error);
        } else {
          return deferred.resolve(data);
        }
      });
      return deferred.promise;
    };


    /*
    Updates for one item on data base
    @param filter [Object] JSON that filters the information of the search
    @return [Promise] promise to be handle
     */

    DataManager.prototype.update = function(newData) {
      var deferred;
      deferred = Q.defer();
      this.model.findById(newData._id, function(error, data) {
        var attribute;
        if (error) {
          return deferred.reject(error);
        } else {
          if (data) {
            for (attribute in newData) {
              data[attribute] = newData[attribute];
            }
            return data.save(function(error, updatedData) {
              if (error) {
                return deferred.reject(error);
              } else {
                return deferred.resolve(updatedData);
              }
            });
          } else {
            return deferred.reject(error);
          }
        }
      });
      return deferred.promise;
    };


    /*
    Removes an item on data base it returns null
    @param filter [Object] JSON that filters the information of the search
    @return [Promise] promise to be handle
     */

    DataManager.prototype.remove = function(filter) {
      var deferred;
      deferred = Q.defer();
      this.model.remove(filter, function(error, data) {
        var err;
        if (error) {
          err = {
            statusCode: 404,
            message: 'error occurred when trying to delete the document'
          };
          return deferred.reject(err);
        } else {
          return deferred.resolve(data);
        }
      });
      return deferred.promise;
    };

    return DataManager;

  })();

  module.exports = DataManager;

}).call(this);

//# sourceMappingURL=base-manager.js.map
