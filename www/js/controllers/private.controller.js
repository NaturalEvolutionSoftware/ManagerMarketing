'use strict';

angular.module('App').controller('privateController', privateCtrlFunction);
privateCtrlFunction.$inject = ['$scope', '$ionicSideMenuDelegate', '$rootScope'];
function privateCtrlFunction($scope, $ionicSideMenuDelegate, $rootScope){
   var vm = this;
   
   $scope.$on('toggleMenu', toggleSideMenu);
   
   function toggleSideMenu(){
       $ionicSideMenuDelegate.toggleLeft();
   }
   
   $scope.$watch(function() { return $ionicSideMenuDelegate.isOpen(); }, function(isOpen) {
        if (isOpen) {
            $rootScope.$broadcast('userDataChanged', vm.user);
        }
    });
  
}