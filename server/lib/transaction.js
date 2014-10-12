(function() {
  var DataManager, Q, Transaction, TransactionModel, mongoose, uuid;

  uuid = require('node-uuid');

  TransactionModel = require('../models/transaction-model');

  DataManager = require('../app/data-manager');

  Q = require('q');

  mongoose = require('mongoose');


  /*
  Required modules
  Defines the modules necessaries
   */

  Transaction = (function() {

    /*
    You can add statements inside the class definition
    which helps establish private scope (due to closures)
    instance is defined as null to force correct scope
     */
    var PrivateClass, instance;

    function Transaction() {}

    instance = null;


    /*
    Creates a private class that we can initialize however
    defined inside this scope to force the use of the
    singleton class.
     */

    PrivateClass = (function() {
      function PrivateClass() {
        this.transactionManager = new DataManager(TransactionModel);
      }

      PrivateClass.prototype.idTransaction = null;


      /*
      Creates a transaction
      @return [Promise] resolve the idTransaction if do not exist any error,
      reject -1 if already exist a transaction.
       */

      PrivateClass.prototype.start = function() {
        var promise;
        promise = Q.defer();
        if (this.idTransaction) {
          promise.reject(-1);
        }
        this.idTransaction = uuid.v1();
        promise.resolve(this.idTransaction);
        return promise.promise;
      };


      /*
      Deletes a transaction
      @return [Promise] resolve true if do not exist any error, reject -1 or
      error if has some problem.
       */

      PrivateClass.prototype.commit = function() {
        var promise;
        promise = Q.defer();
        if (this.idTransaction) {
          this.deleteActions(this.idTransaction).then((function(_this) {
            return function() {
              _this.idTransaction = null;
              return promise.resolve(true);
            };
          })(this)).fail(function(error) {
            return promise.reject(error);
          });
        } else {
          promise.reject(-1);
        }
        return promise.promise;
      };


      /*
      Rollbacks the all action of one transaction
      @return [Promise] resolve true if do not exist any error, reject -1 or
      error if has some problem.
       */

      PrivateClass.prototype.rollback = function() {
        var promise;
        promise = Q.defer();
        if (this.idTransaction) {
          this.rollbackActions(this.idTransaction).then((function(_this) {
            return function() {
              _this.idTransaction = null;
              return promise.resolve(true);
            };
          })(this)).fail(function(error) {
            return promise.reject(error);
          });
        } else {
          promise.reject(-1);
        }
        return promise.promise;
      };


      /*
      Finds and Deletes one action of a transaction
      @param idTransaction [String] the identification of one transaction
      @return [Promise] resolve array of data deleted, reject an error.
       */

      PrivateClass.prototype.deleteAction = function(action) {
        var dataTrans, promise;
        promise = Q.defer();
        dataTrans = {
          idTransaction: this.idTransaction,
          typeAction: action.typeAction,
          objectTrans: action.objectTrans,
          nameSchema: action.nameSchema,
          date: action.date
        };
        TransactionModel.remove(dataTrans, function(error, data) {
          if (error) {
            return promise.reject(error);
          } else {
            return promise.resolve(data);
          }
        });
        return promise.promise;
      };


      /*
      Deletes all action of a transaction
      @param idTransaction [String] the identification of one transaction
      @return [Promise] resolve array of data deleted, reject an error.
       */

      PrivateClass.prototype.deleteActions = function(idTransaction) {
        var dataTrans, promise;
        promise = Q.defer();
        dataTrans = {
          idTransaction: idTransaction
        };
        TransactionModel.remove(dataTrans, function(error, data) {
          if (error) {
            return promise.reject(error);
          } else {
            return promise.resolve(data);
          }
        });
        return promise.promise;
      };


      /*
      Adds one action to transaction schema
      @param type [String] Type of action example: save, delete or update
      @param Object [String] Current object of this action
      @param collection [String] Name of Schema
      @return [Promise] resolve a new action registed, reject an error.
       */

      PrivateClass.prototype.addAction = function(type, object, collection) {
        var dataTrans, promise;
        promise = Q.defer();
        dataTrans = {
          idTransaction: this.idTransaction,
          typeAction: type,
          objectTrans: JSON.stringify(object),
          nameSchema: collection
        };
        TransactionModel.create(dataTrans, function(error, data) {
          if (error) {
            return promise.reject(error);
          } else {
            return promise.resolve(data);
          }
        });
        return promise.promise;
      };


      /*
      rollback all Actions of one transaction
      @param idTransaction [String] the identification of the one transaction
      @return [Promise] resolve array of rollbacks data, reject an error.
       */

      PrivateClass.prototype.rollbackActions = function(idTransaction) {
        var deferred;
        deferred = Q.defer();
        this.getActions(idTransaction).then((function(_this) {
          return function(actions) {
            var action, allPromises, promises, _i, _len;
            promises = [];
            for (_i = 0, _len = actions.length; _i < _len; _i++) {
              action = actions[_i];
              promises.push(_this.rollbackAction(action));
            }
            allPromises = Q.all(promises);
            return allPromises.then(function(success) {
              return deferred.resolve(success);
            }, function(error) {
              return deferred.reject(error);
            });
          };
        })(this)).fail(function(error) {
          return deferred.reject(error);
        });
        return deferred.promise;
      };


      /*
      classifies a current action and call to it rollback
      @param action [Transaction] register of a transaction
       */

      PrivateClass.prototype.rollbackAction = function(action) {
        switch (action.typeAction) {
          case "save":
            return this.rollbackInsert(action);
        }
      };


      /*
      rollbacks the action that is the type save
      @param action [Transaction] register of a transaction
      @return [Promise] resolve array of length of registers deleted
      otherwise reject an error.
       */

      PrivateClass.prototype.rollbackInsert = function(action) {
        var collection, dataDel, filter, object, promise;
        object = action.objectTrans;
        collection = action.nameSchema;
        promise = Q.defer();
        collection = this.getDataModel(collection);
        filter = JSON.parse(object);
        dataDel = {
          _id: filter._id
        };
        collection.remove(dataDel, (function(_this) {
          return function(error, data) {
            if (error) {
              return promise.reject(error);
            } else {
              return _this.deleteAction(action).then(function() {
                return promise.resolve(data);
              }).fail(function(error) {
                return promise.reject(error);
              });
            }
          };
        })(this));
        return promise.promise;
      };


      /*
      This is a search of the all action of a transaction
      @param idTransaction [String] the identification of the one transaction
      @return [Promise] resolve array of actions of one transaction
      [Array<transaction>] otherwise reject an error.
       */

      PrivateClass.prototype.getActions = function(idTransaction) {
        var filter, promise;
        promise = Q.defer();
        filter = {
          idTransaction: idTransaction
        };
        TransactionModel.find(filter).sort('-date').exec(function(error, transResult) {
          if (error) {
            return promise.reject(error);
          } else {
            return promise.resolve(transResult);
          }
        });
        return promise.promise;
      };

      PrivateClass.prototype.getDataModel = function(nameSchema) {
        return mongoose.model(nameSchema);
      };

      return PrivateClass;

    })();


    /*
    This is a static method used to either retrieve the
    instance or create a new one.
     */

    Transaction.getInstance = function() {
      return instance != null ? instance : instance = new PrivateClass();
    };

    return Transaction;

  })();

  module.exports = Transaction;

}).call(this);

//# sourceMappingURL=transaction.js.map
