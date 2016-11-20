angular.module('App').factory('$login', loginService);

loginService.$inject = ['$q', '$http', '$session', '$users', '$constants'];
function loginService($q, $http, $session, $users, $constants){
  var self= {
      'checkLogin' : submitLogin,
      'logout'     : logOut
  };
  
  function submitLogin(loginData){
      var deferred = $q.defer();
       
       var data = {
           'username' : loginData.username,
           'password' : loginData.password
       }

       $http.post($constants.serverUrl + $constants.services.login, data).then(function(response){
           if(Object.keys(response.data).length > 0){
               $session.setAuthenticatedUser(response.data);
           }
           deferred.resolve(response);
       }, function(error){
           deferred.reject(error);
       });
       
       return deferred.promise;
  }
  
  function logOut(){
     $session.clear();
     return $http.post($constants.serverUrl + $constants.services.logout, {});
  }
  
  return self;
};