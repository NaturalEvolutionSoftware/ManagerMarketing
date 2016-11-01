angular.module('starter').factory('$session', sessionService);

sessionService.$inject = ['$q', '$http', '$constants'];
function sessionService($q, $http, $constants){
  var self= {
      'setAuthenticatedUser' : setAuthUser,
      'getUserData' : getAuthUser,
      'validateSession' : checkUser
  };
  
  var authUser = null;
  
  function setAuthUser(userdata){
      authUser = userdata
  }
  
  function getAuthUser(){
      return authUser;
  }
  
  function checkUser(){
     var deferred = $q.defer();
     $http.post($constants.serverUrl + $constants.services.getSession, {}).then(function(response){
         setAuthUser(response.data);
         deferred.resolve(response);
     },function(error){
         console.error(error);
         deferred.reject(error);
     });
     return deferred.promise;
  }
  
  return self;
};