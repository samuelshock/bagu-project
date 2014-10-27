'use strict'

angular.module 'baguApp'
.controller 'CategoriesMainCtrl', ($scope, Categories) ->

  $scope.categories = Categories.query()
