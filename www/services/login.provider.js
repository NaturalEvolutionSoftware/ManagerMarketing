angular.module('starter').factory('$login', loginService);

loginService.$inject = ['$q', '$http', '$session', '$users'];
function loginService($q, $http, $session, $users){
  var self= {
      'checkLogin' : submitLogin 
  };
  
  function submitLogin(loginData){
      var deferred = $q.defer();
      
      setTimeout(function(){
          var user = $users.getUser(loginData.username);
          
          if(user !== null && user.password === loginData.password){
              $session.setAuthenticatedUser(user.data);
              deferred.resolve({});
          }else{
              deferred.reject({'myStatus' : 'notFound'});
          }
          
      }, 500);
       
       return deferred.promise;
  }
  
  return self;
};