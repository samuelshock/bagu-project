'use strict'

describe 'Service: webApiResources', ->

  # load the service's module
  beforeEach module 'baguApp'

  # instantiate service
  webApiResources = undefined
  beforeEach inject (_webApiResources_) ->
    webApiResources = _webApiResources_

  it 'should do something', ->
    expect(!!webApiResources).toBe true