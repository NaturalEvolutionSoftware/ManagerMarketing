'use strict';

angular.module('App')

.controller('dataCtrl', dataController);

dataController.$inject = ['$scope', '$session', '$users', '$ionicLoading', '$ionicModal', '$constants', '$rootScope', '$navigation', '$utils'];
function dataController($scope, $session, $users, $ionicLoading, $ionicModal, $constants, $rootScope, $navigation, $utils) {
    var vm = this;
    vm.user = {};
    vm.newUser = new modalForm($ionicModal, $scope, $constants.routes.modals.newUser);
    vm.submitNewUser = editUser,
    vm.openEditUserModal = editUserInit,
    vm.toggleMenu = openMenu;
    vm.openNewPass = newPassInit;
    vm.submitNewPass = submitPassword;
    vm.newPass = new modalForm($ionicModal, $scope, $constants.routes.modals.newPassword);
    vm.newUserOptions = $constants.newUserOptions;
    vm.isAdmin = checkRoleAdmin;
    vm.isSuperAdmin = checkRoleSuperAdmin;
    
    $scope.$on('$ionicView.enter', initDataCtrl);
    
    function checkRoleAdmin(){
      return vm.user.permission === $constants.roles.admin;
   }
   
   function checkRoleSuperAdmin(){
      return vm.user.permission === $constants.roles.superadmin;
   }
    
   function initDataCtrl(){
       $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
   }
   
   function sessionValidateSucceed(){
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
    
    function editUserInit(){
        
        var idx;
        if(vm.user.permission === $constants.roles.superadmin){
            vm.newUserOptions = $constants.editUserOptionsSuperAdmin;
            idx = vm.user.permission;
        }else{
            vm.newUserOptions = $constants.newUserOptions;
            idx = vm.user.permission - 1;
        }
        
        console.log(vm.user.birthdate);
        
        vm.newUser.data = {
           'userId'      : vm.user.id,
           'username'    : vm.user.username,
           'name'        : vm.user.name,
           'lastname'    : vm.user.lastname,
           'mail'        : vm.user.mail,
           'cc'          : parseInt(vm.user.cc),
           'birthdate'   : new Date(vm.user.birthdate + ' 00:00:00'),
           'permission'  : vm.newUserOptions[idx],
           'role'        : vm.user.role
        };
        vm.newUser.isEdit = true; 
        vm.newUser.open();
    }
    
    function editUser(valid){
        
        vm.newUser.submitted = true;
        
        if(!valid){
            return;
        }
        
        var data = vm.newUser.data;
        data.permission = data.permission.id;
        $ionicLoading.show();
        $users.editUser(data).then(editUserSucceed, editUserFailed);
    }
    
    function editUserSucceed(response){
        $ionicLoading.hide();
        
        if(!response.data.hasOwnProperty('status')){
            alert('La cédula proporcionada ya existe en el sistema.');
            return;
        }
        
        if(response.data.status){
            $users.getUser(vm.user.id).then(function(response){
                $session.setAuthenticatedUser(response.data);
                vm.user = response.data;
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
        
        vm.newPass.submitted = true;
        
        if(!valid){
            return;
        }
        
        if(!$utils.checkPassword(vm.newPass.data.password, vm.newPass.data.confirm)){
            vm.newPass.submitted = false;
            vm.newPass.data.password = '';
            vm.newPass.data.confirm = '';
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