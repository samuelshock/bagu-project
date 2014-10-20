'use strict'

describe 'Controller: ArrangementsCtrl', ->

  # load the controller's module
  beforeEach module 'baguApp'
  ArrangementsCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ArrangementsCtrl = $controller 'ArrangementsCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
