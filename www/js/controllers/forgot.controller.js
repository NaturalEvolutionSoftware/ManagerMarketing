'use strict';

angular.module('App')

.controller('forgotCtrl', forgotController);

forgotController.$inject = ['$constants', '$forgot', '$scope', '$navigation', '$users'];
function forgotController($constants, $forgot, $scope, $navigation, $users) {
    var vm = this;
	vm.forgotData = {
        'recover' : '',
        'code'    : '',
        'password': ''
    };
    vm.isUserOk = false;
    vm.isCodeOk = false;
    vm.sendCode = checkUserForCode;
    vm.checkCode = checkCode;
    vm.goBack = goToLogin;
    vm.changePassword = submitPassword;
    
    $scope.$on('$ionicView.enter', initForgotCtrl);
    
   function initForgotCtrl(){
       vm.isUserOk = false;
       vm.isCodeOk = false;
       vm.userId = -1;
   }
    
    function checkUserForCode() {
       $forgot.checkUser(vm.forgotData.recover).then(checkUserForCodeSucceed, checkUserForCodeFailed); 
    }
    
    function checkUserForCodeSucceed(response){
        if(Object.keys(response.data).length > 0){
            vm.isUserOk = true;
            var data = {
                'userId' : response.data.id,
                'mail'   : response.data.mail
            }
            $forgot.sendCode(data).then(sendCodeSucceed, sendCodeFailed); 
        }else{
            alert('el usuario o correo suministrado no existe');
            console.error(response);
        }
    }
    
    function sendCodeSucceed(response) {
        console.log(response);
    }
    
    function sendCodeFailed(error) {
       console.error(error);
    }
    
    function checkUserForCodeFailed(error) {
        console.error(error);
    }
    
    function checkCode(){
        $forgot.checkCode(vm.forgotData.code).then(checkCodeSucceed, checkCodeFailed); 
    }
    
    function checkCodeSucceed(response) {
       if(Object.keys(response.data).length > 0){
           vm.isCodeOk = true;
           vm.userId = response.data.userId;
       }else{
           alert('código incorrecto');
           console.error(response);
       }
    }
    
    function checkCodeFailed(error) {
        console.error(error);
    }
    
    function goToLogin() {
        $navigation.goTo($constants.routes.public.login);   
    }
    
    function submitPassword(){
        var data = {
            'userId' : vm.userId,
            'password' : vm.forgotData.password
        };
        $users.changePassword(data).then(changePasswordSucceed, changePasswordFailed);
    }
    
    function changePasswordSucceed(response){
        if(response.data.status){
            alert('la contraseña fue cambiada correctamente');
            $navigation.goTo($constants.routes.public.login);   
        }else{
            console.error(response.data);
        }
    }
    
    function changePasswordFailed(error){
        console.error(error);
    }
}