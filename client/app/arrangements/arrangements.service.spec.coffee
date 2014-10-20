'use strict'

describe 'Service: arrangements', ->

  # load the service's module
  beforeEach module 'baguApp'

  # instantiate service
  arrangements = undefined
  beforeEach inject (_arrangements_) ->
    arrangements = _arrangements_

  it 'should do something', ->
    expect(!!arrangements).toBe true