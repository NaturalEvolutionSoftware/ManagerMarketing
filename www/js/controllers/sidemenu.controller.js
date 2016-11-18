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
   vm.isBasic = checkRoleBasic;
   vm.isSuperAdmin = checkRoleSuperAdmin;
   vm.isSalePoint = checkSalePoint;
   vm.isSystemAdmin = checkSystemAdmin;
   
   function changeView(view){
      $ionicSideMenuDelegate.toggleLeft();
      $navigation.goTo(view);       
   }
   
  function checkRoleBasic(){
      return vm.user.permission === $constants.roles.basic;
  }
  
  function checkRoleSuperAdmin(permission){
      return vm.user.permission === $constants.roles.superadmin;
  }
  
  function checkSalePoint(){
      return vm.company.category === $constants.companyTypes.salepoint;
  }
  
  function checkSystemAdmin(){
      return vm.company.category === $constants.companyTypes.systemAdmin;
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
    
    $rootScope.$on('userDataChanged', function(){
        $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
    });
}