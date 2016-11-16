angular.module('App').factory('$forgot', forgotService);

forgotService.$inject = ['$constants', '$http'];
function forgotService($constants, $http){ 
  var users;
    
  var self= {
      'checkUser': checkUser,
      'sendCode' : sendCodeToUser,
      'checkCode' : checkCode
  };
  
  function checkUser(data){
      var data = {'userData' : data};
      return $http.post($constants.serverUrl + $constants.services.getUserForgot, data);
  }
  
  function sendCodeToUser(data){
      return $http.post($constants.serverUrl + $constants.services.sendCode, data);
  }
  
  function checkCode(code) {
      var data = {'code' : code};
      return $http.post($constants.serverUrl + $constants.services.checkCode, data);
  }
 
  return self;
};