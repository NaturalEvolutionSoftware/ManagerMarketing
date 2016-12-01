'use strict';

angular.module('App')

.controller('contactCtrl', contactController);

contactController.$inject = ['$contact', '$session', '$scope', '$ionicLoading'];
function contactController($contact, $session, $scope, $ionicLoading) {
    var vm = this;
    vm.contactData = {};
    vm.contactData.submitted = false;
    vm.submitMessage = messageSubmitted;
    vm.user = {};
    vm.contactOptions = [{
        id: 1,
        label: 'Agradecimiento'
    }, {
        id: 2,
        label: 'Sugerencia'
    }, {
        id: 3,
        label: 'Reclamo'
    }];
    vm.contactData.motive = vm.contactOptions[0];
    vm.toggleMenu = openMenu;
    
    $scope.$on('$ionicView.enter', initContactCtrl);
   
   function initContactCtrl(){
       $ionicLoading.show();
       $session.validateSession().then(sessionValidateSucceed, sessionValidateFailed);
   }
   
   function sessionValidateSucceed(response){
        $ionicLoading.hide();
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
    
    function messageSubmitted(valid){
        vm.contactData.submitted = true;
        if (!valid) {return;}
        $ionicLoading.show();
        
        var messageData = {
            'userId' : vm.user.id,
            'motive' : vm.contactData.motive.label,
            'message': vm.contactData.message,
            'date': Date.now(),
        }
        
        $contact.sendMessage(messageData).then(messageSubmittedSuccess, messageSubmittedFailed);
    }
    
    function messageSubmittedSuccess(response) {
        $ionicLoading.hide();
        if(response.data.status){
            vm.contactData = {};
            vm.contactData.submitted = false;
            alert('Gracias por su opinión, el mensaje ha sido enviado correctamente.');
        }else{
            console.error(response);
        }
    }
    
    function messageSubmittedFailed(error) {
        $ionicLoading.hide();
        console.error(error);
    }
    
    function openMenu(){
       $scope.$emit('toggleMenu');
    }
}