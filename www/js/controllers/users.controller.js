'use strict';

angular.module('App').controller('usersCtrl', usersCtrlFunction);
usersCtrlFunction.$inject = ['$scope', '$ionicPopup', '$ionicLoading', '$constants','$ionicModal', '$session', '$company', '$users', '$navigation'];
function usersCtrlFunction($scope, $ionicPopup, $ionicLoading, $constants, $ionicModal, $session, $company, $users, $navigation){
   
   var vm = this;
   
   vm.companyUsers = [],
   vm.newUser = new modalForm($ionicModal, $scope, $constants.routes.modals.newUser),
   vm.newPass = new modalForm($ionicModal, $scope, $constants.routes.modals.newPassword)
   vm.submitNewUser = submitUserForm,
   vm.submitNewPass = submitPassword,
   vm.deleteUser = userDelete,
   vm.openNewUserModal = newUserInit,
   vm.openEditUserModal = editUserInit,
   vm.openPasswordModal = newPassInit,
   vm.userCanModify = canModify,
   vm.toggleMenu = openMenu,
   vm.toggleDetails = toggleShowDetails,
   vm.isCurrentUser = isUser;
   
   $scope.$on('$ionicView.enter', initUsersCtrl);
   
   function initUsersCtrl(){
       $ionicLoading.show();
       $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
   }
   
   function isUser(user){
      return vm.user.id === user.id;
   }
   
   function newUserInit(){
      vm.newUser.isEdit = false; 
      vm.newUser.data = {};
      vm.newUser.data.permission = $constants.roles.basic;
      vm.newUser.open();
    }
    
    function newPassInit(user){
        vm.newPass.data = {
           'userId'   : user.id
        };
        vm.newPass.open();
    }
    
    function editUserInit(user){
        vm.newUser.data = {
           'userId'      : user.id,
           'username'    : user.username,
           'name'        : user.name,
           'lastname'    : user.lastname,
           'mail'        : user.mail,
           'cc'          : parseInt(user.cc),
           'birthdate'   : new Date(user.birthdate),
           'role'        : user.role
        };
        vm.newUser.isEdit = true; 
        vm.newUser.open();
    }
   
   function sessionValidateSucceed(response){
        $ionicLoading.hide();
        if($session.getUserData() !== null){
            vm.user = $session.getUserData();
            $ionicLoading.show();
            $session.getCompanyData().then(function(response){
                vm.company = response;
            }, function(){console.error('fallo en carga de empresa desde variable de sesión')});
            $company.getUsers(vm.user.companyId).then(updateCompanyUsersSucceed, updateCompanyUsersFailed);
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
    
    function updateCompanyUsers(){
        $ionicLoading.show();
        $company.getUsers(vm.user.companyId).then(updateCompanyUsersSucceed, updateCompanyUsersFailed);
    }
    
    function updateCompanyUsersSucceed(response){
        $ionicLoading.hide();
        vm.companyUsers = response.data;
        vm.companyUsers.forEach(function(user){
            user.showDetails = false;
        })
    }
    
    function toggleShowDetails(user){
        user.showDetails = !user.showDetails; 
    }
    
    function updateCompanyUsersFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
   
   function submitUserForm(valid){
        vm.newUser.submitted = true;
        if (!valid) {return;}
        $ionicLoading.show();
        
        if(vm.newUser.isEdit){
            editUser();
        }else{
            createUser();
        }
    }
    
    function submitPassword(valid){
        $users.changePassword(vm.newPass.data).then(changePasswordSucceed, changePasswordFailed);
    }
    
    function createUser(){
        var data = vm.newUser.data;
        var userData = {
            'name'        : data.name,
            'lastname'    : data.lastname,
            'cc'          : data.cc,
            'birthdate'   : data.birthdate,
            'username'    : data.username,
            'password'    : data.password,
            'mail'        : data.mail,
            'role'        : data.role,
            'permission'  : data.permission,
            'companyId'   : vm.company.id
        };
        
        $users.createUser(userData).then(createUserSucceed, createUserFailed);
    }
    
    function editUser(){
        var data = vm.newUser.data;
        $users.editUser(data).then(editUserSucceed, editUserFailed);
    }
    
    function userDelete(user){
        var confirmPopup = $ionicPopup.confirm($constants.popups.confirmUserDelete);
        confirmPopup.then(function(res) {
            if(res) {
                $users.deleteUser(user.id).then(deleteUserSucceed, deleteUserFailed);
            }
        });
    }
    
    function createUserSucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            vm.newUser.close();
            updateCompanyUsers();
            alert('el usuario fue creado exitosamente');
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function createUserFailed(error) {
        $ionicLoading.hide();
        alert('fallo en la creación de usuarios');
        console.error(error);
    }
    
    function changePasswordSucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            vm.newPass.close();
            alert('contraseña cambiada correctamente');
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function changePasswordFailed(error) {
        $ionicLoading.hide();
        alert('fallo en el cambio de contraseña');
        console.error(error);
    }
    
     function editUserSucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            vm.newUser.close();
            updateCompanyUsers();
            alert('datos modificados correctamente');   
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
    
    function deleteUserSucceed(response) {
        $ionicLoading.hide();
        updateCompanyUsers();
        alert('usuario eliminado correctamente');
    }
    
    function deleteUserFailed(error){
        $ionicLoading.hide();
        alert('fallo en la eliminación de usuario');
        console.error(error);
    }
    
    function canModify(user){
        return (vm.user.id !== user.id) && (parseInt(vm.user.permission) <= parseInt(user.permission));
    }
    
    function openMenu(){
       $scope.$emit('toggleMenu');
    }
}