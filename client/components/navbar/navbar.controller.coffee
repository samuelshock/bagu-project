'use strict'

angular.module 'baguApp'
.controller 'NavbarCtrl', ($scope, $location, Auth, SessionService, Configuration) ->
  $scope.isCollapsed = true
  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser
#  $scope.city = 'cochabamba'
  unless SessionService.get("city")
    $scope.city = "cochabamba"
    SessionService.set "city", "cochabamba"
  else
    $scope.city = SessionService.get("city")

  $scope.cities = []
  Configuration.get (data) ->
    SessionService.set 'confData', JSON.stringify data
    for city in data.cities
      $scope.cities.push city
    SessionService.set 'cities', JSON.stringify data.cities


  $scope.changeCity = (city) ->
    SessionService.set 'city', city
    $scope.city = city
    location.reload()



  $scope.menu = [
    title: 'Inicio'
    link: '/'
  ]

  $scope.menus = [
    title: 'Perfil'
    link: '/profile'
    class: 'glyphicon glyphicon-user'
  ,
    title: 'Crear Publicacion'
    link: "/create-publication"
    class: 'glyphicon glyphicon-send'
  ]

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'

  $scope.isActive = (route) ->
    route is $location.path()