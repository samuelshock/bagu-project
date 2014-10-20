'use strict'

angular.module 'baguApp'
.factory 'Arrangements', ($resource) ->
  $resource 'api/arrangements/:id',
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
