'use strict'

angular.module 'baguApp'
.service "SessionService", [ "$http", ($http) ->

  #get a variable with 'key' key
  get: (key) ->
    sessionStorage.getItem key


  #set a variable with 'key' key and 'value' value
  set: (key, val) ->
    sessionStorage.setItem key, val


  #unset the variable with 'key' key
  unset: (key) ->
    sessionStorage.removeItem key


  #clear all session variables
  unsetAll: ->
    sessionStorage.clear()
]