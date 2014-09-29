uuid = require 'node-uuid'
TransactionModel = require '../models/transaction-model'
DataManager = require '../app/data-manager'
Q = require 'q'
mongoose = require 'mongoose'
###
Required modules
Defines the modules necessaries
###

class Transaction

  ###
  You can add statements inside the class definition
  which helps establish private scope (due to closures)
  instance is defined as null to force correct scope
  ###
  instance = null

  ###
  Creates a private class that we can initialize however
  defined inside this scope to force the use of the
  singleton class.
  ###
  class PrivateClass
    constructor: ->
      @transactionManager = new DataManager TransactionModel
    idTransaction: null

    ###
    Creates a transaction
    @return [Promise] resolve the idTransaction if do not exist any error,
    reject -1 if already exist a transaction.
    ###
    start: ->
      promise = Q.defer()
      if @idTransaction
        promise.reject -1
      @idTransaction = uuid.v1()
      promise.resolve @idTransaction
      promise.promise

    ###
    Deletes a transaction
    @return [Promise] resolve true if do not exist any error, reject -1 or
    error if has some problem.
    ###
    commit: ->
      promise = Q.defer()
      if @idTransaction
        @deleteActions(@idTransaction)
        .then =>
          @idTransaction = null
          promise.resolve true
        .fail (error) ->
          promise.reject error
      else
        promise.reject -1
      promise.promise

    ###
    Rollbacks the all action of one transaction
    @return [Promise] resolve true if do not exist any error, reject -1 or
    error if has some problem.
    ###
    rollback: ->
      promise = Q.defer()
      if @idTransaction
        @rollbackActions(@idTransaction)
        .then =>
          @idTransaction = null
          promise.resolve true
        .fail (error) ->
          promise.reject error
      else
        promise.reject -1
      promise.promise

    ###
    Finds and Deletes one action of a transaction
    @param idTransaction [String] the identification of one transaction
    @return [Promise] resolve array of data deleted, reject an error.
    ###
    deleteAction: (action) ->
      promise = Q.defer()
      dataTrans =
        idTransaction: @idTransaction
        typeAction: action.typeAction
        objectTrans: action.objectTrans
        nameSchema: action.nameSchema
        date: action.date
      TransactionModel.remove dataTrans, (error, data) ->
        if error
          promise.reject error
        else
          promise.resolve data
      promise.promise

    ###
    Deletes all action of a transaction
    @param idTransaction [String] the identification of one transaction
    @return [Promise] resolve array of data deleted, reject an error.
    ###
    deleteActions: (idTransaction) ->
      promise = Q.defer()
      dataTrans =
        idTransaction: idTransaction
      TransactionModel.remove dataTrans, (error, data) ->
        if error
          promise.reject error
        else
          promise.resolve  data
      promise.promise

    ###
    Adds one action to transaction schema
    @param type [String] Type of action example: save, delete or update
    @param Object [String] Current object of this action
    @param collection [String] Name of Schema
    @return [Promise] resolve a new action registed, reject an error.
    ###
    addAction: (type, object, collection) ->
      promise = Q.defer()
      dataTrans =
        idTransaction: @idTransaction
        typeAction: type
        objectTrans: JSON.stringify object
        nameSchema: collection
      TransactionModel.create dataTrans, (error, data) ->
        if error
          promise.reject error
        else
          promise.resolve  data
      promise.promise

    ###
    rollback all Actions of one transaction
    @param idTransaction [String] the identification of the one transaction
    @return [Promise] resolve array of rollbacks data, reject an error.
    ###
    rollbackActions: (idTransaction) ->
      deferred = Q.defer()
      @getActions(idTransaction)
      .then (actions)=>
        promises = []
        for action in actions
          promises.push @rollbackAction(action)
        allPromises = Q.all promises
        allPromises.then (success) ->
          deferred.resolve success
        , (error) ->
          deferred.reject error
      .fail (error) ->
        deferred.reject error
      deferred.promise

    ###
    classifies a current action and call to it rollback
    @param action [Transaction] register of a transaction
    ###
    rollbackAction: (action) ->
      switch action.typeAction
        when "save" then @rollbackInsert action

    ###
    rollbacks the action that is the type save
    @param action [Transaction] register of a transaction
    @return [Promise] resolve array of length of registers deleted
    otherwise reject an error.
    ###
    rollbackInsert: (action) ->
      object =  action.objectTrans
      collection = action.nameSchema
      promise = Q.defer()
      collection = @getDataModel collection
      filter = JSON.parse object
      dataDel =
        _id: filter._id
      collection.remove dataDel, (error, data) =>
        if error
          promise.reject error
        else
          @deleteAction(action)
          .then ->
            promise.resolve  data
          .fail (error) ->
            promise.reject error
      promise.promise

    ###
    This is a search of the all action of a transaction
    @param idTransaction [String] the identification of the one transaction
    @return [Promise] resolve array of actions of one transaction
    [Array<transaction>] otherwise reject an error.
    ###
    getActions: (idTransaction) ->
      promise = Q.defer()
      filter =
        idTransaction: idTransaction
      TransactionModel.find(filter)
      .sort('-date')
      .exec (error, transResult) ->
        if error
          promise.reject error
        else
          promise.resolve  transResult
      promise.promise

    getDataModel: (nameSchema) ->
      mongoose.model nameSchema

  ###
  This is a static method used to either retrieve the
  instance or create a new one.
  ###
  @getInstance: ->
    instance ?= new PrivateClass()

# > Export a class
module.exports = Transaction