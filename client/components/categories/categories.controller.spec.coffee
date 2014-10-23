'use strict'

describe 'Controller: CategoriesCtrl', ->

  # load the controller's module
  beforeEach module 'baguApp'
  CategoriesCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    CategoriesCtrl = $controller 'CategoriesCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
