'use strict';

angular.module('App')

.controller('loginCtrl', loginController);

loginController.$inject = ['$messages', '$login', '$navigation', '$constants', '$scope'];
function loginController($messages, $login, $navigation, $constants, $scope) {
    var vm = this;
	vm.msg = $messages;
    vm.forgotPass = goToForgot;
    vm.logindata = {
        'username' : '',
        'password' : ''
    }
    
    $scope.$on('$ionicView.enter', initForgotCtrl);
    
   function initForgotCtrl(){
       vm.logindata = {
            'username' : '',
            'password' : ''
        }
   }
    
    vm.submitLogin = function() {
        $login.checkLogin(vm.logindata).then(submitLoginSuccess, submitLoginFailure);
    }
    
    function submitLoginSuccess(response){
        if(Object.keys(response.data).length > 0){         
            $navigation.goTo($constants.routes.private.data);   
        }else{
            alert('nombre de usuario o contraseña incorrectos')
        }
    }
    
    function submitLoginFailure(error){
        alert('existen problemas de conexión con el servidor');
        console.error(error);
    }
    
    function goToForgot(params) {
        $navigation.goTo($constants.routes.public.forgot);   
    }
}