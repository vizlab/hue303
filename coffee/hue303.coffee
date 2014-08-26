app = angular.module 'hue303', ['ngResource', 'ui.router']

app.controller 'MainController', require './controllers/main'

app.value 'username', '1234567890'

app.value 'host', '10.236.52.18'

app.factory 'endpoint', (host, username) ->
  "http://#{host}/api/#{username}"

app.factory 'Light', ($resource, endpoint) ->
  $resource "#{endpoint}/lights/:lightId", {},
    query:
      method: 'GET'
      isArray: true
      transformResponse: (body) ->
        data = JSON.parse body
        for id, light of data
          light.id = id
          light
    updateState:
      method: 'PUT'
      url: "#{endpoint}/lights/:lightId/state"
      transformResponse: ->

app.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.state 'main',
    controller: 'MainController'
    templateUrl: 'partials/main.html'
    url: '/'
    resolve:
      lights: (Light) ->
        Light.query().$promise

  $urlRouterProvider.otherwise '/'

  return
