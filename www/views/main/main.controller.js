'use strict';

angular.module('starter.main')

.controller('mainCtrl', mainController);

mainController.$inject = ['$messages', '$session','$location', '$company','$scope', '$ionicModal', '$constants', '$utils', '$users', '$ionicLoading', '$ionicPopup', '$login'];
function mainController($messages, $session, $location, $company, $scope, $ionicModal, $constants, $utils, $users, $ionicLoading, $ionicPopup, $login) {
    var vm = this;
    vm.constants = $constants;
	vm.msg = $messages;
    vm.user = {};
    vm.company = {};
    vm.companyUsers = {};
    vm.subcompanies = {};
    vm.curSubcompany = null;
    
    vm.newUser = new modalForm($ionicModal, $scope, $constants.routes.modals.newUser);
    vm.newCompany = new modalForm($ionicModal, $scope, $constants.routes.modals.newCompany);
    vm.newSuperAdmin = new modalForm($ionicModal, $scope, $constants.routes.modals.newSuperAdmin);
    
    vm.checkUser = function(){
        $ionicLoading.show();
        $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
    };
    
    vm.checkSuperAdmin = function(company){
        return company.superadmin && Object.keys(company.superadmin).length > 0;
    }
    
    vm.logout = function(){
        $login.logout().then(function(response){
            $location.url('/login')
        }, function(error){
            console.error(error);
            $location.url('/login');
        });
    }
    
    vm.submitNewUser = function(valid){
        vm.newUser.submitted = true;
        if (!valid) {return;}
        var data = vm.newUser.data;
        var userData = {
            'name'        : data.name,
            'lastname'    : data.lastname,
            'cc'          : data.cc,
            'birthdate'   : data.birthdate,
            'username'    : data.username,
            'password'    : data.password,
            'role'        : data.role,
            'permission'  : data.permission,
            'companyId'   : vm.company.id
        };
        
        $users.createUser(userData).then(createUserSucceed, createUserFailed);
    }
    
    vm.submitNewCompany = function(valid){
        vm.newCompany.submitted = true;
        if (!valid){return;}
        var data = vm.newCompany.data;
        
        var companyData = {
            'parentCompany' : vm.company.id,
            'name' : data.name,
            'nit'  : data.nit,
            'category' : $utils.getSubCompanyType(vm.company.category)
        }
        
        $company.createCompany(companyData).then(createCompanySucceed, createCompanyFailed);
    }
    
    vm.submitNewSuperAdmin = function(valid){
        vm.newSuperAdmin.submitted = true;
        if (!valid){return;}
        var data = vm.newSuperAdmin.data;
        
        var userData = {
            'name'        : data.name,
            'lastname'    : data.lastname,
            'cc'          : data.cc,
            'birthdate'   : data.birthdate,
            'username'    : data.username,
            'password'    : data.password,
            'role'        : data.role,
            'permission'  : data.permission,
            'companyId'   : vm.curSubcompany
        }
        
        $users.createUser(userData).then(createSuperAdminSucceed, createSuperAdminFailed);
    }
    
    vm.deleteUser = function(user){
        var confirmPopup = $ionicPopup.confirm($constants.popups.confirmUserDelete);
        confirmPopup.then(function(res) {
            if(res) {
                $users.deleteUser(user.id).then(deleteUserSucceed, deleteUserFailed);
            }
        });
    }
    
     vm.deleteCompany = function(companyId){
        var confirmPopup = $ionicPopup.confirm($constants.popups.confirmCompanyDelete);
        
        confirmPopup.then(function(res) {
            if(res) {
                $company.deleteCompany(companyId).then(deleteCompanySucceed, deleteCompanyFailed);
            }
        });
    }
    
    vm.canUserSeeUsers = function () {
        return vm.user.permission === $constants.roles.superadmin || vm.user.permission === $constants.roles.admin;
    }
    
    vm.canUserSeeCompanies = function () {
       return vm.company.category !== $constants.companyTypes.salepoint && vm.user.permission === $constants.roles.superadmin;
    }
    
    vm.userCanDelete = function(permission){
        return parseInt(vm.user.permission) <= parseInt(permission);
    }
    
    vm.newUserInit = function(){
        vm.newUser.data = {};
        vm.newUser.data.permission = $constants.roles.basic;
        vm.newUser.open();
    }
    
    vm.newSuperAdminInit = function(subcompanyId){
        vm.curSubcompany = subcompanyId;
        vm.newSuperAdmin.data = {};
        vm.newSuperAdmin.open();
    }
    
    vm.newCompanyInit = function(){
        vm.newCompany.data = {};
        vm.newCompany.open();
    }
    
    vm.getCompanyTag = $utils.getCompanyTag;
    
    function updateCompany(){
        $ionicLoading.show();
        $company.getCompany(vm.user.companyId).then(updateCompanySucceed, updateCompanyFailed);
    }
      
    function updateCompanyUsers(){
        $ionicLoading.show();
        $company.getUsers(vm.user.companyId).then(updateCompanyUsersSucceed, updateCompanyUsersFailed);
    }
    
    function updateSubCompanies(){
        $ionicLoading.show();
        $company.getSubCompanies(vm.user.companyId).then(updateSubCompaniesSucceed, updateSubCompaniesFailed);
    }
    
    function updateSuperAdmins(){
        vm.subcompanies.forEach(function(company) {
            $ionicLoading.show();
            $company.getSuperAdmin(company.id).then(function(response) {
                company.superadmin = response.data;
                $ionicLoading.hide();
            }, function(error){
                console.error(error);
                $ionicLoading.hide();
            })
        }, this);
    }
    
    function sessionValidateSucceed(response){
        $ionicLoading.hide();
        if($session.getUserData() !== null){
            vm.user = $session.getUserData();
            updateCompany();
            updateCompanyUsers();
            updateSubCompanies();
        }else{
            alert('no hay ninguna sesión de usuario activa');
            $location.url('/login');
        }
    }
    
    function sessionValidateFailed(error){
        $ionicLoading.hide();
        alert('no se puede validar sesión contra el servidor');
        $location.url('/login');
    }
    
    function updateCompanySucceed(response){
        $ionicLoading.hide();
        vm.company = response.data;
    }
    
    function updateCompanyFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
    
    function updateSubCompaniesSucceed(response){
        $ionicLoading.hide();
        vm.subcompanies = response.data;
        if(vm.subcompanies.length > 0){
            updateSuperAdmins();
        }
    }
    
    function updateSubCompaniesFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
    
    function updateCompanyUsersSucceed(response){
        $ionicLoading.hide();
        vm.companyUsers = response.data;
        updateSubCompanies(); 
    }
    
    function updateCompanyUsersFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
    
    function createUserSucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            vm.newUser.close();
            updateCompanyUsers();   
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function createUserFailed(error) {
        $ionicLoading.hide();
        alert('fallo en la creación de usuarios');
        console.error(error);
    }
    
    function createCompanySucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            vm.newCompany.close();
            updateSubCompanies();  
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
        
    function createCompanyFailed(error) {
        $ionicLoading.hide();
        alert('fallo en la creación de subempresa');
        console.error(error);
    }
    
    function createSuperAdminSucceed(response) {
        $ionicLoading.hide();
        if(response.data.status){
            vm.newSuperAdmin.close();
            updateSuperAdmins();
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function createSuperAdminFailed(response) {
        $ionicLoading.hide();
        alert('fallo en la asignación de administrador');
        console.error(error);
    }
    
    function deleteUserSucceed(response) {
        $ionicLoading.hide();
        updateCompanyUsers();
    }
    
    function deleteUserFailed(error){
        $ionicLoading.hide();
        alert('fallo en la eliminación de usuario');
        console.error(error);
    }
    
    function deleteCompanySucceed(response) {
        $ionicLoading.hide();
        updateSubCompanies();
    }
    
    function deleteCompanyFailed(error){
        $ionicLoading.hide();
        alert('fallo en la eliminación de empresa');
        console.error(error);
    }

}