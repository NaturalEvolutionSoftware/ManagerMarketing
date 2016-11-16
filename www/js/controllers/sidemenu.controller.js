'use strict';

angular.module('App').controller('sideMenuController', sideMenuCtrlFunction);
sideMenuCtrlFunction.$inject = ['$constants', '$navigation','$session', '$utils', '$login', '$ionicSideMenuDelegate', '$rootScope'];
function sideMenuCtrlFunction($constants, $navigation, $session, $utils, $login, $ionicSideMenuDelegate, $rootScope){
   var vm = this; 
   vm.user = {},
   vm.company = {},
   vm.getCompanyTag = $utils.getCompanyTag,
   vm.goTo = changeView,
   vm.routes = $constants.routes.private,
   vm.logout = exit;
    
   initPrivateCtrl();
    
   function changeView(view){
      $ionicSideMenuDelegate.toggleLeft();
      $navigation.goTo(view);       
   }
   
   function initPrivateCtrl(){
       $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
   }
   
   function sessionValidateSucceed(response){
        if($session.getUserData() !== null){
            vm.user = $session.getUserData();
            $session.getCompanyData().then(function(response){
                vm.company = response;
            }, function(){console.error('fallo en carga de empresa desde variable de sesión')});
        }else{
            alert('no hay ninguna sesión de usuario activa');
            $navigation.goTo($constants.routes.public.login); 
        }
    }
    
    function sessionValidateFailed(error){
        $ionicLoading.hide();
        alert('no se puede validar sesión contra el servidor');
        $navigation.goTo($constants.routes.public.login); 
    }
    
    function exit(){
        $login.logout().then(function(response){
            $navigation.goTo($constants.routes.public.login);
        }, function(error){
            console.error(error);
            $navigation.goTo($constants.routes.public.login);
        });
    }
    
    $rootScope.$on('userDataChanged', function(event, args){
        vm.user = args;
    });
}