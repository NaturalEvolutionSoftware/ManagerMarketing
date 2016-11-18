'use strict';

angular.module('App').controller('backupController', backupCtrlFunction);
backupCtrlFunction.$inject = ['$scope', '$http', '$backup', '$ionicPopup', '$constants', '$session', '$navigation'];
function backupCtrlFunction($scope, $http, $backup, $ionicPopup, $constants, $session, $navigation){
   var vm = this;
   
   vm.downloadDB = descargarDB;
   vm.fileData = null;
   vm.sendBackup = sendBackupFile;
   vm.isFileReady = checkFileReady;
   vm.toggleMenu = openMenu;
   
   $scope.$on('$ionicView.enter', initBackupCtrl);
   
   function descargarDB(){
       $backup.download();
   }
   
   function initBackupCtrl(){
       $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
   }
   
   function sessionValidateSucceed(response){
        if($session.getUserData() !== null){
            var user = $session.getUserData();
            if(user.permission !== $constants.roles.superadmin){
                $navigation.goTo($constants.routes.private.data); 
            }
            $session.getCompanyData().then(function(response){
                var company = response;
                if(company.category != $constants.companyTypes.systemAdmin){
                    $navigation.goTo($constants.routes.private.data); 
                }
            }, function(){
                console.error('fallo en carga de empresa desde variable de sesión');
                $navigation.goTo($constants.routes.private.data);
            });
        }else{
            $navigation.goTo($constants.routes.public.login);  
        }
    }
    
    function sessionValidateFailed(error){
        console.error(error);
        $navigation.goTo($constants.routes.public.login);
    }
   
   function checkFileReady(){
       return true;
   }
   
   $scope.updateFileData = function(element) {
        var fd = new FormData();
        fd.append('recover', element.files[0]);
        vm.fileData = fd;
    };
    
    function sendBackupFile(){
        
        if(vm.fileData === null){
            return;
        }
        
        var confirmPopup = $ionicPopup.confirm($constants.popups.confirmBackup);
        confirmPopup.then(function(res) {
            if(res) {
               $backup.apply(vm.fileData).then(sendBackupFileSucceed, sendBackupFileFailed);
            }
        });
        
    }
    
    function sendBackupFileSucceed(response) {
        console.log(response);
    }
    
    function sendBackupFileFailed(error) {
        console.error(error);
    }
    
    function openMenu(){
       $scope.$emit('toggleMenu');
    }
}