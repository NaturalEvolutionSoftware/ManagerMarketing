'use strict';

angular.module('starter.main')

.controller('mainCtrl', mainController);

mainController.$inject = ['$messages', '$session','$location', '$company','$scope', '$ionicModal', '$constants', '$utils', '$users'];
function mainController($messages, $session, $location, $company, $scope, $ionicModal, $constants, $utils, $users) {
    var vm = this;
	vm.msg = $messages.getMessages();
    vm.user = {};
    vm.company = {};
    vm.companyUsers = {};
    vm.subcompanies = {};
    vm.curSubcompany = null;
    var x = true;
    var constants = $constants.getConstants();
    vm.constants = constants;
    vm.newUser = new modalForm($ionicModal, $scope, constants.routes.modals.newUser);
    vm.newCompany = new modalForm($ionicModal, $scope, constants.routes.modals.newCompany);
    vm.newSuperAdmin = new modalForm($ionicModal, $scope, constants.routes.modals.newSuperAdmin);
    vm.formUser = {};
    vm.formCompany = {};
    vm.formSuperAdmin = {};
    
    vm.checkUser = function(){
        if($session.isUserAuthenticated()){
            vm.user = $session.getUserData();
            //vm.user = constants.mocks.users.lacero.data;
            vm.company = $company.getCompany(vm.user.company);
            vm.companyUsers = $company.getUsers(vm.user.company);
            vm.subcompanies = $company.getSubCompanies(vm.user.company);
        }else{
            alert('no hay ninguna sesión de usuario activa');
            $location.url('/login');
        }
    };
    
    vm.submitNewUser = function(valid){
        
        /*validate contents*/
        var role, roleLvl; 
        vm.newUser.submitted = true;
        
        if (!valid)
        {
           return;
        }
        
        if(vm.formUser.other){
            role = vm.formUser.other;
            roleLvl = constants.roles.other;
        }else{
            role = $utils.getRoleName(vm.formUser.role);
            roleLvl = constants.roles.admin;
        }
        
        var userData = {
            'password' : vm.formUser.password,
            'data' : {
                'id' : vm.formUser.username,
                'name' : vm.formUser.name,
                'lastname' : vm.formUser.lastname,
                'company' : vm.user.company,
                'role' : role,
                'roleLvl' : roleLvl
            }
        }
        
        if($company.addUserToCompany(vm.user.company, userData)){
            vm.newUser.close();
            vm.formUser = {};
            vm.companyUsers = $company.getUsers(vm.user.company);
        }else{
            alert('error en la creación de usuario');
        }
    }
    
    vm.submitNewCompany = function(valid){
        
        /*validate contents*/
        var role, roleLvl; 
        vm.newCompany.submitted = true;
        
        if (!valid)
        {
           return;
        }
       
       console.log($utils.getSubCompanyType(vm.company.category));
        
        var companyData = {
            'name' : vm.formCompany.name,
            'category' : $utils.getSubCompanyType(vm.company.category),
            'subcompanies' : [],
            'users' : []
        }
        
        if($company.addSubCompany(vm.user.company, companyData)){
            vm.newCompany.close();
            vm.formCompany = {};
            vm.subcompanies = $company.getSubCompanies(vm.user.company);
        }else{
            alert('error en la creación de subempresa');
        }
    }
    
        vm.submitNewSuperAdmin = function(valid){
        
        /*validate contents*/
        var role, roleLvl; 
        vm.newSuperAdmin.submitted = true;
        
        if (!valid)
        {
           return;
        }
        
        var userData = {
            'password' : vm.formSuperAdmin.password,
            'data' : {
                'id' : vm.formSuperAdmin.username,
                'name' : vm.formSuperAdmin.name,
                'lastname' : vm.formSuperAdmin.lastname,
                'company' : vm.curSubcompany,
                'role' : constants.roleTags.superadmin,
                'roleLvl' : constants.roles.superadmin
            }
        }
        
        if($company.addUserToCompany(vm.curSubcompany, userData)){
            vm.newSuperAdmin.close();
            vm.formSuperAdmin = {};
            vm.companyUsers = $company.getUsers(vm.user.company);
        }else{
            alert('error en la creación de usuario');
        }
    }
    
    vm.checkOther = function() {
        return vm.formUser.role === constants.roles.other;
    };
    
    vm.deleteUser = function(userId){
        if($company.removeUserFromCompany(vm.user.company, userId)){
            vm.companyUsers = $company.getUsers(vm.user.company);
        }else{
            alert('error en la eliminación de usuario');
        }
    }
    
    vm.deleteCompany = function(companyId){
        if($company.removeSubCompany(vm.user.company, companyId)){
            vm.subcompanies = $company.getSubCompanies(vm.user.company);
        }else{
            alert('error en la eliminación de empresa');
        }
    }
    
    vm.getSuperAdminName = function(companyId){
        var user = $company.getSuperAdmin(companyId);
        if(user.name && user.lastname){
            return user.name + ' ' + user.lastname;
        }
        return '';
    }
    
    vm.openSuperAdmin = function(subcompanyId){
        vm.curSubcompany = subcompanyId;
        vm.newSuperAdmin.open();
    }
    
    vm.canUserSeeUsers = function () {
        return vm.user.roleLvl === constants.roles.superadmin || vm.user.roleLvl === constants.roles.admin;
    }
    
    vm.canUserSeeCompanies = function () {
       return vm.company.category !== constants.companyTypes.salepoint && vm.user.roleLvl === constants.roles.superadmin;
    }
    
    vm.getCompanyTag = $utils.getCompanyTag;
}