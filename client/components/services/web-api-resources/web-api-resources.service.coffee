'use strict'

angular.module 'baguApp'
.factory 'Configuration', ($resource) ->
  $resource '/api/configuration/',
    {}
  ,
    get:
      method: 'GET'

