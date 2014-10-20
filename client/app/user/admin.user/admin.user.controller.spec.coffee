'use strict'

describe 'Controller: AdminUserCtrl', ->

  # load the controller's module
  beforeEach module 'baguApp'
  AdminUserCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    AdminUserCtrl = $controller 'AdminUserCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
