'use strict';

angular.module('starter.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'views/main/main.html',
    controller: 'mainCtrl',
    controllerAs: 'vm'
  });
}])