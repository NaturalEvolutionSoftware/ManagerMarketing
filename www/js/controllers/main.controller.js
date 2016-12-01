'use strict';

angular.module('App')

.controller('mainCtrl', mainController);

mainController.$inject = ['$messages', '$session','$location', '$company','$scope', '$ionicModal', '$constants', '$utils', '$users', '$ionicLoading', '$ionicPopup', '$login', '$navigation'];
function mainController($messages, $session, $location, $company, $scope, $ionicModal, $constants, $utils, $users, $ionicLoading, $ionicPopup, $login, $navigation) {
    var vm = this;
    vm.constants = $constants,
	vm.msg = $messages,
    vm.company = {},
    vm.subcompanies = [],
    vm.curSubcompany = null,
    vm.openNewSuperAdminModal = newSuperAdminInit,
    vm.openNewCompanyModal = newCompanyInit,
    vm.getCompanyTag = $utils.getCompanyTag,
    vm.submitNewCompany = submitCompany,
    vm.submitNewSuperAdmin = submitSuperAdmin,
    vm.checkSuperAdmin = checkAdmin,
    vm.deleteCompany = companyDelete,
    vm.toggleMenu = openMenu,
    vm.toggleShowAdmin = toggleShowAdmin,
    vm.deleteSuperAdmin = superAdminDelete,
    vm.openEditSuperAdminModal = editUserInit,
    vm.openSuperAdminPasswordModal = newPassInit, 
    vm.openEditCompanyModal = editCompanyInit,
    vm.submitNewPass = submitPassword,
    vm.newCompany = new modalForm($ionicModal, $scope, $constants.routes.modals.newCompany),
    vm.newSuperAdmin = new modalForm($ionicModal, $scope, $constants.routes.modals.newSuperAdmin),
    vm.newPass = new modalForm($ionicModal, $scope, $constants.routes.modals.newPassword);
    vm.isSalePoint = checkCompanySalePoint,
    vm.changeSuperAdmin = new modalForm($ionicModal, $scope, $constants.routes.modals.changeSuperAdmin),
    vm.openSuperAdminChangeModal = changeSuperAdminInit;
    vm.possibleSuperAdmins = [];
    vm.turnToSuperAdmin = transformToSuperAdmin;
    
    $scope.$on('$ionicView.enter', initCompaniesCtrl);
    
    function checkCompanySalePoint() {
        return vm.company.category === $constants.companyTypes.salepoint;
    }
    
    function sessionValidateSucceed(response){
        $ionicLoading.hide();
        if($session.getUserData() !== null){
            vm.user = $session.getUserData();
            if(vm.user.permission !== $constants.roles.superadmin){
                $navigation.goTo($constants.routes.private.data); 
            }
            $session.getCompanyData().then(function(response){
                vm.company = response;
            }, function(){console.error('fallo en carga de empresa desde variable de sesión')});
            updateSubCompanies();
        }else{
            //alert('no hay ninguna sesión de usuario activa');
            $navigation.goTo($constants.routes.public.login); 
        }
    }
    
    function sessionValidateFailed(error){
        $ionicLoading.hide();
        //alert('no se puede validar sesión contra el servidor');
        $navigation.goTo($constants.routes.public.login); 
    }
    
    function initCompaniesCtrl(){
        $ionicLoading.show();
        $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
    };
    
    function checkAdmin(company){
        return company.superadmin && Object.keys(company.superadmin).length > 0;
    }
    
    function transformToSuperAdmin(userId){
        
        var confirmPopup = $ionicPopup.confirm($constants.popups.confirmSuperAdminChange);
        confirmPopup.then(function(res) {
            if(res) {
                $company.setSuperAdmin(vm.curSubcompany, userId).then(setSuperAdminSucceed, setSuperAdminFailed);
            }
        });
    }
    
    function setSuperAdminSucceed(response){
        vm.changeSuperAdmin.close();
        vm.possibleSuperAdmins = [];
        updateSuperAdmins();
    }
    
    function setSuperAdminFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
    
    function submitCompany(valid){
        vm.newCompany.submitted = true;
        if (!valid){return;}
        
        if($utils.checkRazonSocial(vm.newCompany.data.name.trim(), true) &&
           $utils.checkId(vm.newCompany.data.nit, true)){
                $ionicLoading.show();
                if(vm.newCompany.isEdit){
                    editCompany();
                }else{
                    createCompany();
                }
           }else{
               
               if(!$utils.checkRazonSocial(vm.newCompany.data.name.trim(), false)){
                   vm.newCompany.data.name = '';
                   return;
               } 
               
               if(!$utils.checkId(vm.newCompany.data.nit, false)) {
                    vm.newCompany.data.nit = '';
                    return;
               }
               
           }

    }
    
    function createCompany(){
        var data = vm.newCompany.data;
        var companyData = {
            'parentCompany' : vm.company.id,
            'name' : data.name,
            'nit'  : data.nit,
            'category' : $utils.getSubCompanyType(vm.company.category)
        }
        
        $company.createCompany(companyData).then(createCompanySucceed, createCompanyFailed);
    }
    
    function editCompany(){
        var data = vm.newCompany.data;
        $company.editCompany(data).then(editCompanySucceed, editCompanyFailed);
    }
    
    function editCompanySucceed(response){
        $ionicLoading.hide();
        
        if(response.data.hasOwnProperty('isCC')){
            alert('EL NIT propocionado se encuentra registrado como cédula en el sistema');
            vm.newCompany.data.nit = '';
            return;
        }
        
         if(response.data.hasOwnProperty('isNit')){
            alert('EL NIT propocionado ya se encuentra registrado en el sistema');
            vm.newCompany.data.nit = '';
            return;
        }
        
        if(response.data.status){
            updateSubCompanies();
            vm.newCompany.close();
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function editCompanyFailed(error) {
        console.error(error);
    }
    
    function submitSuperAdmin(valid){
        vm.newSuperAdmin.submitted = true;
        if (!valid){return;}
        
        if(vm.newSuperAdmin.data.password !== vm.newSuperAdmin.data.confirm){
            alert('las contraseñas no coinciden');
            vm.newSuperAdmin.data.password = '';
            vm.newSuperAdmin.data.confirm = '';
            return;
        }
        
           if($utils.checkName(vm.newSuperAdmin.data.name.trim(), true) &&
           $utils.checkName(vm.newSuperAdmin.data.lastname.trim(), true) &&
           $utils.checkEmail(vm.newSuperAdmin.data.mail.trim(), true) &&
           $utils.checkId(vm.newSuperAdmin.data.cc, true) &&
           $utils.checkDate(vm.newSuperAdmin.data.birthdate, true) &&
           $utils.checkCargo(vm.newSuperAdmin.data.role.trim(), true)){
                $ionicLoading.show();
                if(vm.newSuperAdmin.isEdit){
                    editSuperAdmin();
                }else{
                    createSuperAdmin();
                }
           }else{
               
               if(!$utils.checkName(vm.newSuperAdmin.data.name.trim(), false)){
                   vm.newSuperAdmin.data.name = '';
                   return;
               } 
               
               if(!$utils.checkName(vm.newSuperAdmin.data.lastname.trim(), false)) {
                    vm.newSuperAdmin.data.lastname = '';
                    return;
               }
               
               if(!$utils.checkEmail(vm.newSuperAdmin.data.mail.trim(), false)){
                   vm.newSuperAdmin.data.mail = '';
                   return;
               }
               
               if(!$utils.checkId(vm.newSuperAdmin.data.cc, false)){
                   vm.newSuperAdmin.data.cc = '';
                   return;
               }
               
               if(!$utils.checkDate(vm.newSuperAdmin.data.birthdate, false)){
                   return;
               }
               
               if(!$utils.checkCargo(vm.newSuperAdmin.data.role.trim(), false)){
                   vm.newSuperAdmin.data.role = '';
                   return;
               }
               
           }
    }
    
    function createSuperAdmin(valid){
        var data = vm.newSuperAdmin.data;
        
        var userData = {
            'name'        : data.name,
            'lastname'    : data.lastname,
            'cc'          : data.cc,
            'birthdate'   : data.birthdate,
            'username'    : data.username,
            'password'    : data.password,
            'mail'        : data.mail,
            'role'        : data.role,
            'permission'  : $constants.roles.superadmin,
            'companyId'   : vm.curSubcompany
        }
        
        $users.createUser(userData).then(createSuperAdminSucceed, createSuperAdminFailed);
    }
    
    function editSuperAdmin(){
        var data = vm.newSuperAdmin.data;
        data.permission = $constants.roles.superadmin;
        $users.editUser(data).then(editSuperAdminSucceed, editSuperAdminFailed);
    }
    
    function editSuperAdminSucceed(response){
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
            vm.newSuperAdmin.close();
            updateSuperAdmins();
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
            console.error(response.data);
        }
        
        //alert('Los datos del super administrador fueron actualizados correctamente')
    }
    
    function editSuperAdminFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
    
    function updateSubCompanies(){
        $ionicLoading.show();
        $company.getSubCompanies(vm.user.companyId).then(updateSubCompaniesSucceed, updateSubCompaniesFailed);
    }
    
    function companyDelete(companyId){
        var confirmPopup = $ionicPopup.confirm($constants.popups.confirmCompanyDelete);
        confirmPopup.then(function(res) {
            if(res) {
                $company.deleteCompany(companyId).then(deleteCompanySucceed, deleteCompanyFailed);
            }
        });
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
    
    function createCompanySucceed(response){
        $ionicLoading.hide();
        
        if(response.data.hasOwnProperty('isCC')){
            alert('EL NIT propocionado se encuentra registrado como cédula en el sistema');
            vm.newCompany.data.nit = '';
            return;
        }
        
        if(response.data.hasOwnProperty('isNit')){
            vm.newCompany.data.nit = '';
            alert('EL NIT propocionado ya se encuentra registrado para otra empresa en el sistema');
            return;
        }
        
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
        
        if(response.data.hasOwnProperty('isNit')){
            alert('La cédula proporcionada ya se encuentra registrada como NIT en el sistema.');
            return;
        }
        
        if(response.data.hasOwnProperty('isCC')){
            alert('La cédula proporcionada ya se encuentra registrada en el sistema.');
            return;
        }
        
        if(response.data.status){
            vm.newSuperAdmin.close();
            updateSuperAdmins();
            //alert('Administrador creado exitosamente');
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function createSuperAdminFailed(response) {
        $ionicLoading.hide();
        alert('fallo en la asignación de administrador');
        console.error(error);
    }
    
    function deleteCompanySucceed(response) {
        $ionicLoading.hide();
        updateSubCompanies();
        //alert('Empresa eliminada exitosamente');
    }
    
    function deleteCompanyFailed(error){
        $ionicLoading.hide();
        alert('fallo en la eliminación de empresa');
        console.error(error);
    }
    
    function newSuperAdminInit(subcompanyId){
        vm.curSubcompany = subcompanyId;
        vm.newSuperAdmin.data = {};
        vm.newSuperAdmin.open();
    }
    
    function changeSuperAdminInit(subcompany){
        vm.curSubcompany = subcompany.id;
        vm.changeSuperAdmin.data.company = subcompany;
        $ionicLoading.show();
        $company.getUsers(subcompany.id).then(getCompanyUsersSucceed, getCompanyUsersFailed);
    }
    
    function getCompanyUsersSucceed(response){
        $ionicLoading.hide();
        vm.possibleSuperAdmins = response.data;
        vm.changeSuperAdmin.open();
    }
    
    function getCompanyUsersFailed(error) {
        $ionicLoading.hide();
        console.error(error);
    }
    
    function newCompanyInit(){
        vm.newCompany.data = {};
        vm.newCompany.submitted = false;
        vm.newCompany.open();
    }
    
    function openMenu(){
       $scope.$emit('toggleMenu');
    }
    
    function toggleShowAdmin(company){
        if(!company.hasOwnProperty('showAdmin')){
            company.showAdmin = true;
        }else{
            company.showAdmin = !company.showAdmin;
        }
    }
    
    function superAdminDelete(id){
        var confirmPopup = $ionicPopup.confirm($constants.popups.confirmSuperAdminDelete);
        confirmPopup.then(function(res) {
            if(res) {
                $ionicLoading.show();
                $users.deleteUser(id).then(superAdminDeleteSucceed, superAdminDeleteFailed);
            }
        });
    }
    
    function superAdminDeleteSucceed(){
        $ionicLoading.hide();
        updateSubCompanies();
        //alert('Administrador eliminado correctamente')
    }
    
    function superAdminDeleteFailed(error){
        $ionicLoading.hide();
        console.error(error);
    }
    
    function editCompanyInit(company){
        vm.newCompany.data = {
           'companyId'  : company.id,
           'nit'        : parseInt(company.nit),
           'name'       : company.name
        };
        vm.newCompany.isEdit = true; 
        vm.newCompany.open();
    }
    
    function editUserInit(user){
        vm.newSuperAdmin.data = {
           'userId'      : user.id,
           'username'    : user.username,
           'name'        : user.name,
           'lastname'    : user.lastname,
           'mail'        : user.mail,
           'cc'          : parseInt(user.cc),
           'birthdate'   : new Date(user.birthdate + ' 00:00:00'),
           'role'        : user.role
        };
        vm.newSuperAdmin.isEdit = true; 
        vm.newSuperAdmin.open();
    }
    
    function newPassInit(user){
        vm.newPass.data = {
           'userId'   : user.id
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
        
        $ionicLoading.show();
        $users.changePassword(vm.newPass.data).then(changePasswordSucceed, changePasswordFailed);
    }
    
    function changePasswordSucceed(response){
        $ionicLoading.hide();
        if(response.data.status){
            vm.newPass.close();
            //alert('contraseña cambiada correctamente');
        }else{
            console.error('ocurrió un error con la base de datos: '+ response.data);
        }
    }
    
    function changePasswordFailed(error){
        console.error(error);
    }

}