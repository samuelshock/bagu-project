'use strict'

angular.module 'baguApp'
.controller 'CreatePublicationCtrl', ($scope, SessionService, Publication, Auth) ->
  $scope.openMap = false
  $scope.publications = Publication.query()
  $scope.mapStatus = 'Agregar Mapa '
  $scope.location =
    lat: null
    lng: null
  $scope.cities = []
  $scope.city =
    nombre: SessionService.get 'city'
    provincias: null
  $scope.province = 'opciones'


  $scope.currentPosition = ->
    navigator.geolocation.getCurrentPosition (position) =>
      $scope.location.lat = position.coords.latitude
      $scope.location.lng = position.coords.longitude
      $scope.location.zoom = 15
      $scope.$apply()

  $scope.address = null

  updateLocation = (location, lat, lng) ->
    location.status = "success"
    location.lat = lat
    location.lng = lng
    location.isSelected = true
    location.zoom = 15
    $scope.$apply()

  $scope.setBasedOnAddress = (location, address) ->
    location.status = "getting address location"
    geocoder = new google.maps.Geocoder()
    geocoder.geocode
      address: address
    , (results, status) =>
        if results and results.length > 0
          latLng = results[0].geometry.location
          updateLocation location, latLng.lat(), latLng.lng()
        else
          location.status = "error"
          $scope.$apply()

  $scope.addMap = ->
    $scope.openMap = !$scope.openMap
    $scope.mapStatus = 'Map added Success!' if $scope.location.isSelected

  $scope.mapAdded = ->
    $scope.openMap = !$scope.openMap

  $scope.tags = [ ]
  $scope.isOpen = false

#  $scope.loadTags = (query) ->
#    data = JSON.parse SessionService.get 'confData'
#    return data.tags

  $scope.createPublication = ->
    cities = JSON.parse SessionService.get 'cities'
    for city in cities
      $scope.cities.push city
    $scope.isOpen = true
    $scope.currentPosition()

  $scope.changeCity = (city) ->
    $scope.city.nombre = city.nombre
    $scope.city.provincias = city.provincias

  $scope.changeProvince = (province) ->
    $scope.province = province


  $scope.cancel = ->
    $scope.tags = []
    $scope.city =
      nombre: SessionService.get 'city'
      provincias: null
    $scope.province = 'opciones'
    $scope.openMap = false
    $scope.isOpen = false

  $scope.savePublication = (newData) ->
    newData.owner = Auth.getCurrentUser()._id
    newData.tags = []
    for tag in $scope.tags
      newData.tags.push tag.text
    newData.map = $scope.location
    newData.city = $scope.city.nombre
    if $scope.province is 'opciones'
      newData.province = ''
    else
      newData.province = $scope.province
    console.log newData
    Publication.create newData, (result) ->
      $scope.publications.push result
      $scope.cancel()
    , (error) ->
      $scope.cancel()
      console.log error
      alert 'error'

  $scope.starsCalc = (stars) ->
    leng = stars.length
    if leng <= 0
      return 1
    else
      count = 0
      for n in stars
        count += n
      return count/leng
    return 1

  $scope.changeClass = (id) ->
    if document.getElementById("block-" + id).className is "block"
      document.getElementById("block-" + id).className += " rotated"
    else
      document.getElementById("block-" + id).className = "block"

  $scope.selectPublish = (id) ->

