'use strict';

angular.module('App').controller('usersCtrl', usersCtrlFunction);
usersCtrlFunction.$inject = ['$scope', '$ionicPopup', '$ionicLoading', '$constants','$ionicModal', '$session', '$company', '$users', '$navigation', '$utils'];
function usersCtrlFunction($scope, $ionicPopup, $ionicLoading, $constants, $ionicModal, $session, $company, $users, $navigation, $utils){
   
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
   vm.newUserOptions = $constants.newUserOptions;
   vm.isQuery = checkRoleQuery;
   vm.isAdmin = checkRoleAdmin;
   vm.isSuperAdmin = checkRoleSuperAdmin;
   vm.user = {};
   
   $scope.$on('$ionicView.enter', initUsersCtrl);
   
   function initUsersCtrl(){
       $ionicLoading.show();
       $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
   }
   
   function checkRoleQuery(){
      return vm.user.permission === $constants.roles.query;
   }
   
   function checkRoleAdmin(){
      return vm.user.permission === $constants.roles.admin;
   }
   
   function checkRoleSuperAdmin(){
      return vm.user.permission === $constants.roles.superadmin;
   }
   
   function isUser(user){
      return vm.user.id === user.id;
   }
   
   function newUserInit(){
      vm.newUser.isEdit = false; 
      vm.newUser.data = {};
      vm.newUserOptions = $constants.newUserOptions;
      vm.newUser.data.permission = vm.newUserOptions[2];
      vm.newUser.open();
    }
    
    function newPassInit(user){
        vm.newPass.data = {
           'userId'   : user.id
        };
        vm.newPass.open();
    }
    
    function editUserInit(user){
        var idx;
        vm.newUserOptions = $constants.newUserOptions;
        idx = user.permission - 1;
        
        vm.newUser.data = {
           'userId'      : user.id,
           'username'    : user.username,
           'name'        : user.name,
           'lastname'    : user.lastname,
           'mail'        : user.mail,
           'cc'          : parseInt(user.cc),
           'birthdate'   : new Date(user.birthdate + ' 00:00:00'),
           'role'        : user.role,
           'permission'  : vm.newUserOptions[idx]
        };
        vm.newUser.isEdit = true; 
        vm.newUser.open();
    }
   
   function sessionValidateSucceed(response){
        $ionicLoading.hide();
        if($session.getUserData() !== null){
            vm.user = $session.getUserData();
            if(vm.user.permission === $constants.roles.basic){
                $navigation.goTo($constants.routes.private.data); 
            }
            $ionicLoading.show();
            $session.getCompanyData().then(function(response){
                vm.company = response;
            }, function(){console.error('fallo en carga de empresa desde variable de sesión')});
            $company.getUsers(vm.user.companyId).then(updateCompanyUsersSucceed, updateCompanyUsersFailed);
        }else{
            $navigation.goTo($constants.routes.public.login);  
        }
    }
    
    function sessionValidateFailed(error){
        $ionicLoading.hide();
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
        
        if($utils.checkName(vm.newUser.data.name.trim(), true) &&
           $utils.checkName(vm.newUser.data.lastname.trim(), true) &&
           $utils.checkEmail(vm.newUser.data.mail.trim(), true) &&
           $utils.checkId(vm.newUser.data.cc, true) &&
           $utils.checkDate(vm.newUser.data.birthdate, true) &&
           $utils.checkCargo(vm.newUser.data.role.trim(), true)){
               
               $ionicLoading.show();
        
                if(vm.newUser.isEdit){
                    editUser();
                }else{
                    createUser();
                }
               
           }else{
               
               if(!$utils.checkName(vm.newUser.data.name.trim(), false)){
                   vm.newUser.data.name = '';
                   return;
               } 
               
               if(!$utils.checkName(vm.newUser.data.lastname.trim(), false)) {
                    vm.newUser.data.lastname = '';
                    return;
               }
               
               if(!$utils.checkEmail(vm.newUser.data.mail.trim(), false)){
                   vm.newUser.data.mail = '';
                   return;
               }
               
               if(!$utils.checkId(vm.newUser.data.cc, false)){
                   vm.newUser.data.cc = '';
                   return;
               }
               
               if(!$utils.checkDate(vm.newUser.data.birthdate, false)){
                   return;
               }
               
               if(!$utils.checkCargo(vm.newUser.data.role.trim(), false)){
                   vm.newUser.data.role = '';
                   return;
               }
               
           }
        
    }
    
    function submitPassword(valid){
        
        vm.newPass.submitted = true;
        
        if (!valid) {return;}
        
        if(!$utils.checkPassword(vm.newPass.data.password, vm.newPass.data.confirm)){
            vm.newPass.submitted = false;
            vm.newPass.data.password = '';
            vm.newPass.data.confirm = '';
            return;
        }
        
        $users.changePassword(vm.newPass.data).then(changePasswordSucceed, changePasswordFailed);
    }
    
    function createUser(){
        
        if(vm.newUser.data.password !== vm.newUser.data.confirm){
            alert('las contraseñas no coinciden');
            vm.newUser.data.password = '';
            vm.newUser.data.confirm = '';
            $ionicLoading.hide();
            return;
        }
        
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
            'permission'  : data.permission.id,
            'companyId'   : vm.company.id
        };
        
        $users.createUser(userData).then(createUserSucceed, createUserFailed);
    }
    
    function editUser(){
        var data = vm.newUser.data;
        data.permission = data.permission.id;
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
        
        if(response.data.hasOwnProperty('isNit')){
            alert('La cédula proporcionada ya se encuentra registrada como NIT en el sistema.');
            return;
        }
        
        if(response.data.hasOwnProperty('isCC')){
            alert('La cédula proporcionada ya se encuentra registrada en el sistema.');
            return;
        }
        
        if(response.data.status){
            vm.newUser.close();
            updateCompanyUsers();
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function createUserFailed(error) {
        $ionicLoading.hide();
        console.error(error);
    }
    
    function changePasswordSucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            vm.newPass.close();
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function changePasswordFailed(error) {
        $ionicLoading.hide();
        console.error(error);
    }
    
     function editUserSucceed(response){
        $ionicLoading.hide();
        
        if(response.data.hasOwnProperty('isNit')){
            alert('La cédula proporcionada ya se encuentra registrada como NIT en el sistema.');
            return;
        }
        
        if(response.data.hasOwnProperty('isCC')){
            alert('La cédula proporcionada ya se encuentra registrada en el sistema.');
            return;
        }
        
        if(response.data.status){
            vm.newUser.close();
            updateCompanyUsers(); 
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
            console.error(response.data);
        }
    }
    
    function editUserFailed(error) {
        $ionicLoading.hide();
        console.error(error);
    }
    
    function deleteUserSucceed(response) {
        $ionicLoading.hide();
        updateCompanyUsers();
    }
    
    function deleteUserFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
    
    function canModify(user){
        return (vm.user.id !== user.id) && (parseInt(vm.user.permission) <= parseInt(user.permission)) && (parseInt(vm.user.permission) <= $constants.roles.admin);
    }
    
    function openMenu(){
       $scope.$emit('toggleMenu');
    }
}