'use strict'

describe 'Controller: ProfileCtrl', ->

  # load the controller's module
  beforeEach module 'baguApp'
  ProfileCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ProfileCtrl = $controller 'ProfileCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
