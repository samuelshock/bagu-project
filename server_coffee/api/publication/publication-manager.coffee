
PublicationModel = require './publication-model'
User = require('../user/user-model')
Map = require('../map/map-model')
_ = require("lodash")

Q = require 'q'

SORT_BY_PRIORITY = 'priority'
SORT_BY_DATE = 'date'
isActive = 'isActive'
BASIC_INFO = "name city province priority stars date isActive images"
SHORT_INFO = "#{BASIC_INFO} shortDescription"
ALL_INFO = "#{BASIC_INFO} description phone tags map comments comments.person"


class PublicationManager

  instance = null
  # Static singleton
  @getInstance: ->
    if not instance?
      instance = new @
    instance

  getAllPublication: (active) ->
    deferred = Q.defer()
    PublicationModel.find({})
    .sort(SORT_BY_DATE)
    .where(isActive).equals(active)
    .exec (err, publications) ->
      deferred.reject err if err
      deferred.resolve publications
    deferred.promise


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

  createPublication: (publication) ->
    deferred = Q.defer()
    PublicationModel.create publication, (err, publication) =>
      deferred.reject err if err
      User.findById publication.owner, (err, user) =>
        deferred.reject err if err
        user.publications.push publication._id
        user.save (error) ->
          deferred.reject error if error
          deferred.resolve publication
    deferred.promise

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

  deletePublication: (publicationId) ->
    deferred = Q.defer()
    PublicationModel.findById publicationId, (err, publication) ->
      deferred.reject err if err
      deferred.reject statusCode: 404 unless publication
      publication.remove (err) ->
        deferred.reject err if err
        deferred.resolve 'removed'
    deferred.promise


