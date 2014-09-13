'use strict'

angular.module 'baguApp'
.config ($routeProvider) ->
  $routeProvider
  .when '/admin',
    templateUrl: 'app/admin/admin.html'
    controller: 'AdminCtrl'
