angular.module('App').factory('$session', sessionService);

sessionService.$inject = ['$q', '$http', '$constants', '$company'];
function sessionService($q, $http, $constants, $company){
  var self= {
      'setAuthenticatedUser' : setAuthUser,
      'getUserData' : getAuthUser,
      'getCompanyData' : getAuthCompany,
      'validateSession' : checkUser
  };
  
  var authData = {
      'user'    : null,
      'company' : null
  };
  
  function setAuthUser(userdata){
      authData.user = userdata
  }
  
  function getAuthUser(){
      return authData.user;
  }
  
  function setAuthCompany(userdata){
      authData.company = userdata
  }
  
  function getAuthCompany(){
      var deferred = $q.defer();
      if(authData.company !== null){
          deferred.resolve(authData.company);
      }else{
          if(authData.user !== null){
             $company.getCompany(authData.user.companyId).then(function(response){
                 if(Object.keys(response.data).length>0){
                    setAuthCompany(response.data);
                    deferred.resolve(authData.company);
                 }else{
                    deferred.reject({});
                 }
             }, function(error){
                 deferred.reject({});
             })   
          }
      }
      return deferred.promise;
  }
  
  function checkUser(){
     var deferred = $q.defer();
     if(authData.user !== null){
         deferred.resolve(true);
     }else{
        $http.post($constants.serverUrl + $constants.services.getSession, {}).then(function(response){
            if(Object.keys(response.data).length>0){
              setAuthUser(response.data);
            }
            deferred.resolve(true);
        },function(error){
            console.error(error);
            deferred.reject(error);
        });
    }
     return deferred.promise;
  }
  
  return self;
};