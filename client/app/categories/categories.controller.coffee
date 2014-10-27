'use strict'

angular.module 'baguApp'
.controller 'CategoriesCtrl', ($scope, Categories) ->

  $scope.categories = Categories.query()

  $scope.registerDate = (date) ->
    return new Date(date)

  $scope.saveCategory = (newData) ->
    if validateFields
      Categories.create newData, (result) ->
        $scope.categories.push result
        $scope.isOpen = false

  $scope.isOpen = false

  $scope.createCategory = ->
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

  $scope.delete = (category) ->
    Categories.remove id: category._id
    angular.forEach $scope.categories, (u, i) ->
      $scope.categories.splice i, 1 if u is category
