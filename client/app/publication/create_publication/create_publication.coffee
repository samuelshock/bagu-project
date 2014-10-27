'use strict'

angular.module 'baguApp'
.config ($routeProvider) ->
  $routeProvider.when '/create-publication',
    templateUrl: 'app/publication/create_publication/create_publication.html'
    controller: 'CreatePublicationCtrl'
