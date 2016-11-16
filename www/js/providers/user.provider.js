angular.module('App').factory('$users', userService);

userService.$inject = ['$constants', '$http'];
function userService($constants, $http){ 
  var users;
    
  var self= {
      'getUser'        : getUserInfo,
      'createUser'     : newUser,
      'deleteUser'     : delUser,
      'editUser'       : modifyUser,
      'changePassword' : editPassword
  };
  
  function getUserInfo(user){
      var data = {'userId' : user};
      return $http.post($constants.serverUrl + $constants.services.getUser, data);
  }
  
  function newUser(userData){
      return $http.post($constants.serverUrl + $constants.services.createUser, userData);
  }
  
  function delUser(user){
      var data = {'userId' : user};
      return $http.post($constants.serverUrl + $constants.services.deleteUser, data);
  }
  
  function modifyUser(userData){
      return $http.post($constants.serverUrl + $constants.services.editUser, userData);
  }
  
  function editPassword(userData){
      return $http.post($constants.serverUrl + $constants.services.editPassword, userData);
  }
  
  return self;
};