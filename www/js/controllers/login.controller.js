'use strict';

angular.module('App').controller('loginController', loginCtrlFunction);
loginCtrlFunction.$inject = ['$navigation', '$constants'];
function loginCtrlFunction($navigation, $constants){
   var vm = this;
   vm.submitLogin  = checkLogin;
   
   function checkLogin(){
        $navigation.goTo($constants.routes.private.main);       
   }
}