'use strict';

angular.module('starter.login')

.controller('loginCtrl', loginController);

loginController.$inject = ['$messages', '$login', '$location'];
function loginController($messages, $login, $location) {
    var vm = this;
	vm.msg = $messages.getMessages();
    vm.logindata = {
        'username' : '',
        'password' : ''
    }
    
    vm.submitLogin = function() {
        $login.checkLogin(vm.logindata).then(submitLoginSuccess, submitLoginFailure);
    }
    
    function submitLoginSuccess(data){
         $location.url('/main');
    }
    
    function submitLoginFailure(error){
        if(error.hasOwnProperty('myStatus')){
            if(error.myStatus === 'notFound'){
                alert('Datos de usuario o contraseña erroneos');
            }
        }
        else{
            alert('Existen inconvenientes en este momento. Inténtelo de nuevo mas tarde');
        }
    }
}