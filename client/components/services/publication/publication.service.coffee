'use strict'

angular.module 'baguApp'
.factory 'Publication', ($resource) ->
  $resource 'api/publications/:id',
    id: '@_id'
  ,
    get:
      method: 'GET'

    update:
      method: 'PUT'

    create:
      method: 'POST'

    delete:
      method: 'DELETE'
