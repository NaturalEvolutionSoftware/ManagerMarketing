'use strict';

angular.module('App', [ 'ionic', 'ngRoute']).config(appConfigFunction).run(appRunFunction);

appConfigFunction.$inject = ['$stateProvider', '$urlRouterProvider'];
function appConfigFunction($stateProvider, $urlRouterProvider){
	$stateProvider.state('public', {
		'url' : '/public',
		'abstract' : true,
		'templateUrl' : 'views/public.html'
    }).state('private', {
		'url' : '/private',
		'abstract' : true,
		'templateUrl' : 'views/private.html'
    }).state('public.login', {
		'url' : '/login',
		'views' : {
			'public' : {
				'templateUrl' : 'views/public/login.html'
			}
		}
	}).state('private.retos', {
		'url' : '/retos',
		'views' : {
			'private' : {
				'templateUrl' : 'views/private/retos.html'
			}
		}
   });

	$urlRouterProvider.otherwise('/public/login');
}

function appRunFunction(){

}




