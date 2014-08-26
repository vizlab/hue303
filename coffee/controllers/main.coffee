module.exports = ($scope, Light, lights) ->
  $scope.lights = lights

  $scope.toggle = (light) ->
    Light.updateState {lightId: light.id}, {on: !light.state.on}, ->
      light.state.on = !light.state.on
  return
