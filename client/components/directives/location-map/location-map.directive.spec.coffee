'use strict'

describe 'Directive: locationMap', ->

  # load the directive's module
  beforeEach module 'baguApp'
  element = undefined
  scope = undefined
  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<location-map></location-map>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the locationMap directive'
