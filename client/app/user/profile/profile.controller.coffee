'use strict'

angular.module 'baguApp'
.controller 'ProfileCtrl', ($scope, Auth) ->

  $scope.isEditing = false

  $scope.newPersonData = {}

  $scope.tabs = [
    title: "Publicaciones"
  ,
    title: "Notificaciones"
  ,
    title: "Pagos"
  ]

  $scope.user = Auth.getCurrentUser()

  $scope.option = $scope.tabs[0].title

  $scope.enableEdit = ->
    aux =
      name: $scope.user.name
      email: $scope.user.email

    $scope.newPersonData = angular.copy aux
    $scope.isEditing = true

  $scope.cancel = ->
    $scope.newPersonData = {}
    $scope.isEditing = false

  $scope.edit = ->
    console.log $scope.newPersonData
    Auth.update $scope.newPersonData
    .then ->
      $scope.message = 'Person successfully changed.'

    .catch ->
      console.log 'ocurrio un error'


