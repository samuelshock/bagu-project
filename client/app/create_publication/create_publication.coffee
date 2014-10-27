'use strict'

angular.module 'baguApp'
.config ($routeProvider) ->
  $routeProvider.when '/create-publication',
    templateUrl: 'app/create_publication/create_publication.html'
    controller: 'CreatePublicationCtrl'
