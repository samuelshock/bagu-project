'use strict'

describe 'Controller: PublicationProfileCtrl', ->

  # load the controller's module
  beforeEach module 'baguApp'
  PublicationProfileCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    PublicationProfileCtrl = $controller 'PublicationProfileCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
