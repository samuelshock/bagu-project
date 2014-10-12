'use strict'

angular.module 'baguApp'
.controller 'AdminCtrl', ($scope, $http, Auth, User) ->

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
    console.log option
    $scope.optionMenu = option


  $scope.checkValue = (option) ->
    return true if $scope.optionMenu is option
    return false

  # Use the User $resource to fetch all users
  $scope.users = User.query()

  $scope.delete = (user) ->
    User.remove id: user._id
    angular.forEach $scope.users, (u, i) ->
      $scope.users.splice i, 1 if u is user
