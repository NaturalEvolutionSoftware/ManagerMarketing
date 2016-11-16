/**
 * HU-57 Funcion de volver del dispositivo (bloqueo)
 */
angular.module('App').service('$navigation', navigationFunction);

navigationFunction.$inject = ['$location', '$constants'];
function navigationFunction($location, $constants){

    var self = {
        'goTo' : goTo,
        'goBack' : goBack,
        'initNavigation' : initNavigationLogin
    };
    
    var breadcrumbs = [];
    
    function goTo(route) {
        breadcrumbs.push(route);
        changeView(route);
    };
    
    function goBack() {
        breadcrumbs.pop();
        if(breadcrumbs.length > 0){
            changeView(breadcrumbs[breadcrumbs.length - 1]);
        }else{
            console.error('no existe vista anterior');   
        }
    };
    
    function changeView(route){
        location.hash = route;
        location.href;
    }
    
    function initNavigationLogin(){
        breadcrumbs = [];
        breadcrumbs.push($constants.routes.public.login);
    }
    
    return self;
} 
