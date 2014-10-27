'use strict'

describe 'Service: publication', ->

  # load the service's module
  beforeEach module 'baguApp'

  # instantiate service
  publication = undefined
  beforeEach inject (_publication_) ->
    publication = _publication_

  it 'should do something', ->
    expect(!!publication).toBe true