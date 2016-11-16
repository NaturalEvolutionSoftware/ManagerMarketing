'use strict';

angular.module('App')

.controller('dataCtrl', dataController);

dataController.$inject = ['$scope', '$session', '$users', '$ionicLoading', '$ionicModal', '$constants', '$rootScope'];
function dataController($scope, $session, $users, $ionicLoading, $ionicModal, $constants, $rootScope) {
    var vm = this;
    vm.user = {};
    vm.newUser = new modalForm($ionicModal, $scope, $constants.routes.modals.newUser);
    vm.submitNewUser = editUser,
    vm.openEditUserModal = editUserInit,
    vm.toggleMenu = openMenu;
    vm.openNewPass = newPassInit;
    vm.submitNewPass = submitPassword;
    vm.newPass = new modalForm($ionicModal, $scope, $constants.routes.modals.newPassword);
    
    $scope.$on('$ionicView.enter', initDataCtrl);
    
   function initDataCtrl(){
       $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
   }
   
   function sessionValidateSucceed(response){
        if($session.getUserData() !== null){
            vm.user = $session.getUserData();
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
    
    function editUserInit(){
        vm.newUser.data = {
           'userId'      : vm.user.id,
           'username'    : vm.user.username,
           'name'        : vm.user.name,
           'lastname'    : vm.user.lastname,
           'mail'        : vm.user.mail,
           'cc'          : parseInt(vm.user.cc),
           'birthdate'   : new Date(vm.user.birthdate),
           'role'        : vm.user.role
        };
        vm.newUser.isEdit = true; 
        vm.newUser.open();
    }
    
    function editUser(){
        var data = vm.newUser.data;
        $ionicLoading.show();
        $users.editUser(data).then(editUserSucceed, editUserFailed);
    }
    
    function editUserSucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            $users.getUser(vm.user.id).then(function(response){
                console.log(response.data);
                $session.setAuthenticatedUser(response.data);
                vm.user = response.data;
                $rootScope.$broadcast('userDataChanged', response.data);
            }, function(error){console.error(error);})
            
            vm.newUser.close();   
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
            console.error(response.data);
        }
    }
    
    function editUserFailed(error) {
        $ionicLoading.hide();
        alert('fallo en la edición de usuarios');
        console.error(error);
    }
    
    function openMenu(){
       $scope.$emit('toggleMenu');
    }
    
    function newPassInit(){
        vm.newPass.data = {
           'userId'   : vm.user.id
        };
        vm.newPass.open();
    }
    
    function submitPassword(valid){
        
        if(!valid){
            return;
        }
        
        $users.changePassword(vm.newPass.data).then(changePasswordSucceed, changePasswordFailed);
    }
    
    function changePasswordSucceed(response){
        if(response.data.status){
            vm.newPass.close();
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function changePasswordFailed(error){
        console.error(error);
    }
}