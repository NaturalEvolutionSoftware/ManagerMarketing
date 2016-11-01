'use strict';

angular.module('starter.login')

.controller('loginCtrl', loginController);

loginController.$inject = ['$messages', '$login', '$location'];
function loginController($messages, $login, $location) {
    var vm = this;
	vm.msg = $messages;
    vm.logindata = {
        'username' : '',
        'password' : ''
    }
    
    vm.submitLogin = function() {
        $login.checkLogin(vm.logindata).then(submitLoginSuccess, submitLoginFailure);
    }
    
    function submitLoginSuccess(response){
        if(Object.keys(response.data).length > 0){         
            $location.url('/main');
        }else{
            alert('nombre de usuario o contraseña incorrectos')
        }
    }
    
    function submitLoginFailure(error){
        alert('existen problemas de conexión con el servidor');
        console.error(error);
    }
}