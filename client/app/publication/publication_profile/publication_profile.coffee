'use strict'

angular.module 'baguApp'
.config ($routeProvider) ->
  $routeProvider.when '/publication_profile/:id',
    templateUrl: 'app/publication/publication_profile/publication_profile.html'
    controller: 'PublicationProfileCtrl'
