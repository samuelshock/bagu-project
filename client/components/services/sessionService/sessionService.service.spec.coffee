'use strict'

describe 'Service: sessionService', ->

  # load the service's module
  beforeEach module 'baguApp'

  # instantiate service
  sessionService = undefined
  beforeEach inject (_sessionService_) ->
    sessionService = _sessionService_

  it 'should do something', ->
    expect(!!sessionService).toBe true
