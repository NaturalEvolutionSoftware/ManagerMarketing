'use strict';

angular.module('App').factory('$constants', constantsFunction);

constantsFunction.$inject = [];
function constantsFunction(){
    return {
        'routes' : {
            'private' : {
                'main' : '/private/retos'
            }
        }
    }
}