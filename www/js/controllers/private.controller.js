'use strict';

angular.module('App').controller('privateController', privateCtrlFunction);
privateCtrlFunction.$inject = ['$scope', '$ionicSideMenuDelegate'];
function privateCtrlFunction($scope, $ionicSideMenuDelegate){
   var vm = this;
   
   $scope.$on('toggleMenu', toggleSideMenu);
   
   function toggleSideMenu(){
       $ionicSideMenuDelegate.toggleLeft();
   }
  
}