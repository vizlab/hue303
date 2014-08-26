(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  module.exports = function($scope, Light, lights) {
    $scope.lights = lights;
    $scope.toggle = function(light) {
      return Light.updateState({
        lightId: light.id
      }, {
        on: !light.state.on
      }, function() {
        return light.state.on = !light.state.on;
      });
    };
  };

}).call(this);

},{}],2:[function(require,module,exports){
(function() {
  var app;

  app = angular.module('hue303', ['ngResource', 'ui.router']);

  app.controller('MainController', require('./controllers/main'));

  app.value('username', '1234567890');

  app.value('host', '10.236.52.18');

  app.factory('endpoint', function(host, username) {
    return "http://" + host + "/api/" + username;
  });

  app.factory('Light', function($resource, endpoint) {
    return $resource("" + endpoint + "/lights/:lightId", {}, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function(body) {
          var data, id, light, _results;
          data = JSON.parse(body);
          _results = [];
          for (id in data) {
            light = data[id];
            light.id = id;
            _results.push(light);
          }
          return _results;
        }
      },
      updateState: {
        method: 'PUT',
        url: "" + endpoint + "/lights/:lightId/state",
        transformResponse: function() {}
      }
    });
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
      controller: 'MainController',
      templateUrl: 'partials/main.html',
      url: '/',
      resolve: {
        lights: function(Light) {
          return Light.query().$promise;
        }
      }
    });
    $urlRouterProvider.otherwise('/');
  });

}).call(this);

},{"./controllers/main":1}]},{},[2]);