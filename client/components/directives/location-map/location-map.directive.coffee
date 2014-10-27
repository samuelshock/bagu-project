'use strict'

angular.module 'baguApp'
.directive 'locationMap', ->
  restrict: "A"
  replace: true
  scope:
    model: "="

  link: (scope, element, attr, ctrl) ->

    #set model defaults
    scope.model = scope.model or {}
    defaults =
      lat: -17
      lng: -66
      isSelected: false
      zoom: ((if scope.model.lat then 8 else 5))

    _.defaults scope.model, defaults

    #set up initial map
    center = new google.maps.LatLng(scope.model.lat, scope.model.lng)
    options =
      zoom: scope.model.zoom
      center: center
      mapTypeId: google.maps.MapTypeId.ROADMAP
      mapTypeControl: false
      streetViewControl: false

    map = new google.maps.Map(element[0], options)
    marker = new google.maps.Marker(
      map: map
      position: center
      draggable: true
    )
#    navigator.geolocation.getCurrentPosition (position) ->
#      scope.model.lat = position.coords.latitude
#      scope.model.lng = position.coords.longitude
#      latLng = new google.maps.LatLng(scope.model.lat, scope.model.lng)
#      map.setCenter latLng
#      marker.setPosition latLng
    marker.setVisible scope.model.isSelected

    #events
    scope.$watch (->
      scope.model.lat + scope.model.lng
    ), ->
      latLng = new google.maps.LatLng(scope.model.lat, scope.model.lng)
      map.setCenter latLng
      marker.setPosition latLng

    scope.$watch "model.isSelected", (newVal) ->
      marker.setVisible newVal

    scope.$watch "model.zoom", (newVal, oldVal) ->
      return  if newVal is oldVal
      map.setZoom newVal

    updateLocation = (location) ->
      scope.model.lat = location.latLng.lat()
      scope.model.lng = location.latLng.lng()
      scope.model.isSelected = true
      scope.$apply()

    google.maps.event.addListener map, "zoom_changed", ->
      zoom = map.getZoom()
      return  if scope.model.zoom is zoom #not actually changed
      scope.model.zoom = zoom
      scope.$apply()

    google.maps.event.addListener map, "click", (location) ->
      updateLocation location

    google.maps.event.addListener marker, "dragend", (location) ->
      updateLocation location

    google.maps.event.addListener marker, "dblclick", ->
      scope.model.isSelected = false
      scope.$apply()

