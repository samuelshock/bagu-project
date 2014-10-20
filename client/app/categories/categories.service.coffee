'use strict'

angular.module 'baguApp'
.factory 'Categories', ($resource) ->
  $resource 'api/categories/:id',
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
