'use strict';

angular.module('App', ['ionic', 'ngRoute']).config(appConfigFunction).run(appRunFunction);

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
	}).state('public.forgot', {
		'url' : '/forgot',
		'views' : {
			'public' : {
				'templateUrl' : 'views/public/forgot.html'
			}
		}
	}).state('private.main', {
		'url' : '/main',
		'views' : {
			'private' : {
				'templateUrl' : 'views/private/main.html'
			}
		}
   }).state('private.users', {
		'url' : '/users',
		'views' : {
			'private' : {
				'templateUrl' : 'views/private/users.html'
			}
		}
   }).state('private.data', {
		'url' : '/data',
		'views' : {
			'private' : {
				'templateUrl' : 'views/private/data.html'
			}
		}
   }).state('private.contact', {
		'url' : '/contact',
		'views' : {
			'private' : {
				'templateUrl' : 'views/private/contact.html'
			}
		}
   }).state('private.backup', {
		'url' : '/backup',
		'views' : {
			'private' : {
				'templateUrl' : 'views/private/backup.html'
			}
		}
   });

	$urlRouterProvider.otherwise('/public/login');
}

function appRunFunction(){

}




