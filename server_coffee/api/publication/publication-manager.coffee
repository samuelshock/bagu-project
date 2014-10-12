
PublicationModel = require './publication-model'
BaseManager = require '../base-manager'
MapManager = require('../action-factory').getActionInstance('map')
CategoryManager = require('../action-factory').getActionInstance('category')
User = require('../user/user-model')
_ = require("lodash")

Q = require 'q'

SORT_BY_PRIORITY = 'priority'
SORT_BY_DATE = 'date'
isActive = 'isActive'
BASIC_INFO = "name city province priority stars date isActive images"
SHORT_INFO = "#{BASIC_INFO} shortDescription"
ALL_INFO = "#{BASIC_INFO} description phone tags map comments comments.person"

# class for manage a publication
class PublicationManager

  constructor: ->
    @publicationManager = BaseManager PublicationModel
    console.log 'instance of publication'


#  instance = null
#  # Static singleton
#  @getInstance: ->
#    if not instance?
#      instance = new @
#    instance
  ###
  Obtains all publication if are active or inactive
  @params active [Boolean] flag of obtains publication
  ###
  getAllPublication: (active) ->
    deferred = Q.defer()
    PublicationModel.find({})
    .sort(SORT_BY_DATE)
    .where(isActive).equals(active)
    .exec (err, publications) ->
      deferred.reject err if err
      deferred.resolve publications
    deferred.promise

  ###
  Obtains a publication by id
  @params publicationId [String] person identifier
  ###
  getPublicationById: (publicationId) ->
    deferred = Q.defer()
    populateOptions = [
      path:'comments.person'
      select:'name profilePhoto'
    ,
      path:'map'
    ]
    PublicationModel.findById(publicationId)
    .sort(SORT_BY_DATE)
    .populate(populateOptions)
    .exec (err, publications) ->
      deferred.reject err if err
      deferred.resolve publications
    deferred.promise

  ###
  Obtains publications by a specific city
  @params city [String] specific city
  @params allInfo [Boolean] flag for all info get
  ###
  getPublicationsByCity: (city, allInfo) ->
    deferred = Q.defer()
    filter =
      city: city.toLowerCase()
    selectBy = BASIC_INFO
    unless allInfo
      selectBy = SHORT_INFO
    else
      selectBy = ALL_INFO

    PublicationModel.find(filter)
    .sort(SORT_BY_DATE)
    .select(selectBy)
    .where(isActive).equals(true)
    .exec (err, publications) ->
      deferred.reject err if err
      deferred.resolve publications
    deferred.promise

  ###
  Obtains publications by criteria
  @param city [String] specific city
  @param options [Object] a json with criteria for search
  ###
  getPublicationsByCriteria: (city, options) ->
    criteria = new RegExp(options,'i')
    deferred = Q.defer()
    filter =
      city: city.toLowerCase()
    finder = [
      name: $regex: criteria
    ,
      tags: $regex: criteria
    ]
    PublicationModel.find(filter)
    .or(finder)
    .sort(SORT_BY_DATE)
    .select(SHORT_INFO)
    .where(isActive).equals(true)
    .exec (err, publications) ->
      deferred.reject err if err
      deferred.resolve publications
    deferred.promise

  ###
  Creates a publication
  @param publication [Object] all info about a publication
  ###
  createPublication: (publication) ->
    deferred = Q.defer()

    @publicationManager.create(publication)
    .then (publication) =>
      deferred.reject err if err
      User.findById publication.owner, (err, user) =>
        deferred.reject err if err
        user.addPublication(publication)
        .then (user) ->
          deferred.resolve publication
    .fail (error) ->
          deferred.reject error
    deferred.promise

  ###
  Updates a publication
  @param publicationUpdated [Publication] fields changes of publication
  ###
  updatePublication: (publicationUpdated) ->
    deferred = Q.defer()
    PublicationModel.findById publicationUpdated._id, (err, publication) ->
      delete publicationUpdated._id
      deferred.reject err if err
      deferred.reject statusCode: 404  unless publication
      updated = _.merge(publication, publicationUpdated)
      updated.save (err) ->
        deferred.reject err  if err
        deferred.resolve publication
    deferred.promise

  ###
  Deletes a publication
  @param publicationId [String] identifier of a publication
  ###
  deletePublication: (publicationId) ->
    deferred = Q.defer()
    PublicationModel.findById publicationId, (err, publication) ->
      deferred.reject err if err
      deferred.reject statusCode: 404 unless publication
      publication.remove (err) ->
        deferred.reject err if err
        deferred.resolve 'removed'
    deferred.promise

module.exports = PublicationManager
