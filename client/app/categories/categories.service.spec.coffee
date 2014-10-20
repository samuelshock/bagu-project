'use strict'

describe 'Service: categories', ->

  # load the service's module
  beforeEach module 'baguApp'

  # instantiate service
  categories = undefined
  beforeEach inject (_categories_) ->
    categories = _categories_

  it 'should do something', ->
    expect(!!categories).toBe true