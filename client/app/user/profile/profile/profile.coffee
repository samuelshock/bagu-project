'use strict'

angular.module 'baguApp'
.config ($routeProvider) ->
  $routeProvider.when '/profile',
    templateUrl: 'app/user/profile/profile/profile.html'
    controller: 'ProfileCtrl'
