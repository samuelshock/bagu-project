'use strict'

angular.module 'baguApp'
.controller 'AdminCtrl', ($scope, $http, Auth) ->

  $scope.menubar = [
    'Home'
    'Users'
    'Categories'
    'Arrangements'
    'Publication'
    'Configuration'
  ]

  $scope.optionMenu = $scope.menubar[0]

  $scope.changeMenuOption = (option) ->
    $scope.optionMenu = option


  $scope.checkValue = (option) ->
    return true if $scope.optionMenu is option
    return false



