###
Requires Q to create promises
###
Q = require 'q'

###
Handles basic operations with data base
###
class DataManager

  ###
  Sets mongoose instance and sets the model to use
  @param mongoose [Mongoose] instance of the Mongoose data base
  @param dataModel [Model] mongoose model
  ###
  constructor: (dataModel) ->
    @model = dataModel

  ###
  Creates a new item on data base
  @param item [Object] the item to save
  @return [Promise] promise to be handle
  ###
  create: (item) ->
    deferred = Q.defer()
    @model.create item, (error, data) ->
      if error
        deferred.reject error
      else
        deferred.resolve data
    deferred.promise

  ###
  Finds items on data base
  @param filter [Object] JSON that filters the information of the search
  @return [Promise] promise to be handle
  ###
  find: (filter) ->
    deferred = Q.defer()
    if filter.hasOwnProperty 'sortBy'
      sortBy = filter.sortBy
      delete filter['sortBy']
      query = @model.find filter
      query.sort sortBy
      query.exec (error, data) ->
        if error
          deferred.reject error
        else
          deferred.resolve data
    else
      @model.find filter, (error, data) ->
        if error
          deferred.reject error
        else
          deferred.resolve data
    deferred.promise

  ###
  Finds an item on data base by its Id
  @param id [String] Id of the item
  @return [Promise] promise to be handle
  ###
  findById: (id) ->
    deferred = Q.defer()
    @model.findById id, (error, data) ->
      if error
        deferred.reject error
      else
        unless id?
          deferred.reject
            errorCode: 5
            message: 'Invalid identifier'
        else
          deferred.resolve data
    deferred.promise

  ###
  Finds one item on data base
  @param filter [Object] JSON that filters the information of the search
  @return [Promise] promise to be handle
  ###
  findOne: (filter) ->
    deferred = Q.defer()
    @model.findOne filter, (error, data) ->
      if error
        deferred.reject error
      else
        deferred.resolve data
    deferred.promise

  ###
  Updates for one item on data base
  @param filter [Object] JSON that filters the information of the search
  @return [Promise] promise to be handle
  ###
  update: (newData) ->
    deferred = Q.defer()
    @model.findById newData._id, (error, data) ->
      if error
        deferred.reject error
      else
        if data
          for attribute of newData
            data[attribute] = newData[attribute]
          data.save (error, updatedData) ->
            if error
              deferred.reject error
            else
              deferred.resolve updatedData
        else
          deferred.reject error
    deferred.promise

  ###
  Removes an item on data base it returns null
  @param filter [Object] JSON that filters the information of the search
  @return [Promise] promise to be handle
  ###
  remove: (filter) ->
    deferred = Q.defer()
    @model.remove filter, (error, data) ->
      if error
        err =
          statusCode: 404
          message: 'error occurred when trying to delete the document'
        deferred.reject err
      else
        deferred.resolve data
    deferred.promise

module.exports = DataManager