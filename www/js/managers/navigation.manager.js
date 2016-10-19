/**
 * HU-57 Funcion de volver del dispositivo (bloqueo)
 */
angular.module('App').service('$navigation', navigationFunction);

navigationFunction.$inject = ['$location'];
function navigationFunction($location){

    var self = {
        'goTo' : changeView
    };
    
    function changeView(route) {
        location.hash = route;
        location.href;
    };
    
    return self;
} 
