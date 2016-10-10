'use strict';

angular.module('starter.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'loginCtrl',
    controllerAs: 'vm'
  });
}])