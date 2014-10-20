'use strict'

angular.module 'baguApp'
.controller 'ArrangementsCtrl', ($scope, Arrangements) ->
  $scope.arrangements = Arrangements.query()
  console.log $scope.arrangements

  $scope.registerDate = (date) ->
    return new Date(date)

  $scope.saveArrangement = (newData) ->
    if validateFields
      Arrangements.create newData, (result) ->
        $scope.arrangements.push result
        $scope.isOpen = false

  $scope.isOpen = false

  $scope.createArrangement = ->
    $scope.isOpen = true

  $scope.cancel = ->
    $scope.isOpen = false

  validateFields = (data) ->
    if data is undefined
      alert 'Ingrese algun valor'
      false

    if data.name is undefined
      alert 'Ingrese algun valor'
      false
    else
      true

  $scope.delete = (arrangement) ->
    Arrangements.remove id: arrangement._id
    angular.forEach $scope.arrangements, (u, i) ->
      $scope.arrangements.splice i, 1 if u is arrangement