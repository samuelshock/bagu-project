'use strict'

describe 'Controller: CreatePublicationCtrl', ->

  # load the controller's module
  beforeEach module 'baguApp'
  CreatePublicationCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    CreatePublicationCtrl = $controller 'CreatePublicationCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
