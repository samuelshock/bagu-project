(function() {
  var ALL_INFO, BASIC_INFO, BaseManager, CategoryManager, MapManager, PublicationManager, PublicationModel, Q, SHORT_INFO, SORT_BY_DATE, SORT_BY_PRIORITY, User, isActive, _;

  PublicationModel = require('./publication-model');

  BaseManager = require('../base-manager');

  MapManager = require('../action-factory').getActionInstance('map');

  CategoryManager = require('../action-factory').getActionInstance('category');

  User = require('../user/user-model');

  _ = require("lodash");

  Q = require('q');

  SORT_BY_PRIORITY = 'priority';

  SORT_BY_DATE = 'date';

  isActive = 'isActive';

  BASIC_INFO = "name city province priority stars date isActive images rating";

  SHORT_INFO = "" + BASIC_INFO + " shortDescription";

  ALL_INFO = "" + BASIC_INFO + " description phone tags map comments comments.person";

  PublicationManager = (function() {
    function PublicationManager() {
      this.publicationManager = new BaseManager(PublicationModel);
      console.log('instance of publication');
    }


    /*
    Obtains all publication if are active or inactive
    @params active [Boolean] flag of obtains publication
     */

    PublicationManager.prototype.getAllPublication = function(active) {
      var deferred;
      deferred = Q.defer();
      PublicationModel.find({}).sort(SORT_BY_DATE).where(isActive).equals(active).exec(function(err, publications) {
        if (err) {
          deferred.reject(err);
        }
        return deferred.resolve(publications);
      });
      return deferred.promise;
    };


    /*
    Obtains a publication by id
    @params publicationId [String] person identifier
     */

    PublicationManager.prototype.getPublicationById = function(publicationId) {
      var deferred, populateOptions;
      deferred = Q.defer();
      populateOptions = [
        {
          path: 'comments.person',
          select: 'name profilePhoto'
        }, {
          path: 'map'
        }
      ];
      PublicationModel.findById(publicationId).sort(SORT_BY_DATE).populate(populateOptions).exec(function(err, publications) {
        if (err) {
          deferred.reject(err);
        }
        return deferred.resolve(publications);
      });
      return deferred.promise;
    };


    /*
    Obtains publications by a specific city
    @params city [String] specific city
    @params allInfo [Boolean] flag for all info get
     */

    PublicationManager.prototype.getPublicationsByCity = function(city, allInfo) {
      var deferred, filter, selectBy;
      deferred = Q.defer();
      filter = {
        city: city.toLowerCase()
      };
      selectBy = BASIC_INFO;
      if (!allInfo) {
        selectBy = SHORT_INFO;
      } else {
        selectBy = ALL_INFO;
      }
      PublicationModel.find(filter).sort(SORT_BY_DATE).select(selectBy).where(isActive).equals(true).exec(function(err, publications) {
        if (err) {
          deferred.reject(err);
        }
        return deferred.resolve(publications);
      });
      return deferred.promise;
    };


    /*
    Obtains publications by criteria
    @param city [String] specific city
    @param options [Object] a json with criteria for search
     */

    PublicationManager.prototype.getPublicationsByCriteria = function(city, options) {
      var criteria, deferred, filter, finder;
      criteria = new RegExp(options, 'i');
      deferred = Q.defer();
      filter = {
        city: city.toLowerCase()
      };
      finder = [
        {
          name: {
            $regex: criteria
          }
        }, {
          tags: {
            $regex: criteria
          }
        }
      ];
      PublicationModel.find(filter).or(finder).sort(SORT_BY_DATE).select(SHORT_INFO).where(isActive).equals(true).exec(function(err, publications) {
        if (err) {
          deferred.reject(err);
        }
        return deferred.resolve(publications);
      });
      return deferred.promise;
    };


    /*
    Creates a publication
    @param publication [Object] all info about a publication
     */

    PublicationManager.prototype.createPublication = function(publication) {
      var deferred, map;
      deferred = Q.defer();
      if (publication.map) {
        map = {
          latitude: publication.map.lat,
          longitude: publication.map.lng,
          zoom: publication.map.zoom,
          isSelected: publication.map.isSelected
        };
        MapManager.create(map).then((function(_this) {
          return function(resMap) {
            publication.map = resMap._id;
            return _this.publicationManager.create(publication);
          };
        })(this)).then((function(_this) {
          return function(publication) {
            return User.findById(publication.owner, function(err, user) {
              if (err) {
                deferred.reject(err);
              }
              return user.addPublication(publication);
            });
          };
        })(this)).then(function(user) {
          return deferred.resolve(publication);
        }).fail(function(error) {
          return deferred.reject(error);
        });
      } else {
        this.publicationManager.create(publication).then((function(_this) {
          return function(publication) {
            return User.findById(publication.owner, function(err, user) {
              if (err) {
                deferred.reject(err);
              }
              return user.addPublication(publication).then(function(user) {
                return deferred.resolve(publication);
              });
            });
          };
        })(this)).fail(function(error) {
          return deferred.reject(error);
        });
      }
      return deferred.promise;
    };


    /*
    Updates a publication
    @param publicationUpdated [Publication] fields changes of publication
     */

    PublicationManager.prototype.updatePublication = function(publicationUpdated) {
      var deferred;
      deferred = Q.defer();
      PublicationModel.findById(publicationUpdated._id, function(err, publication) {
        var updated;
        delete publicationUpdated._id;
        if (err) {
          deferred.reject(err);
        }
        if (!publication) {
          deferred.reject({
            statusCode: 404
          });
        }
        updated = _.merge(publication, publicationUpdated);
        return updated.save(function(err) {
          if (err) {
            deferred.reject(err);
          }
          return deferred.resolve(publication);
        });
      });
      return deferred.promise;
    };

    PublicationManager.prototype.updateStarsComment = function(publicationUpdated) {
      var deferred;
      deferred = Q.defer();
      PublicationModel.findById(publicationUpdated._id, function(err, publication) {
        var updated;
        delete publicationUpdated._id;
        if (err) {
          deferred.reject(err);
        }
        if (!publication) {
          deferred.reject({
            statusCode: 404
          });
        }
        if (publicationUpdated.stars) {
          publication.stars.push(publicationUpdated.stars);
          delete publicationUpdated.stars;
        }
        if (publicationUpdated.comments) {
          publication.comments.push(publicationUpdated.comments);
          delete publicationUpdated.comment;
        }
        updated = publication;
        return updated.save(function(err) {
          if (err) {
            deferred.reject(err);
          }
          return deferred.resolve(publication);
        });
      });
      return deferred.promise;
    };


    /*
    Deletes a publication
    @param publicationId [String] identifier of a publication
     */

    PublicationManager.prototype.deletePublication = function(publicationId) {
      var deferred;
      deferred = Q.defer();
      PublicationModel.findById(publicationId, function(err, publication) {
        if (err) {
          deferred.reject(err);
        }
        if (!publication) {
          deferred.reject({
            statusCode: 404
          });
        }
        return publication.remove(function(err) {
          if (err) {
            deferred.reject(err);
          }
          return deferred.resolve('removed');
        });
      });
      return deferred.promise;
    };

    return PublicationManager;

  })();

  module.exports = PublicationManager;

}).call(this);

//# sourceMappingURL=publication-manager.js.map
