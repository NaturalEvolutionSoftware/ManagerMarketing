angular.module('starter').factory('$users', userService);

userService.$inject = ['$constants', '$http'];
function userService($constants, $http){ 
  var users;
    
  var self= {
      'getUser' : getUserInfo,
      'createUser' : newUser,
      'deleteUser' : delUser,
      'editUser'   : modifyUser
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
      var data = {
          'userId'      : userData.id,
          'name'        : userData.name,
          'lastname'    : userData.lastname,
          'cc'          : userData.cc,
          'birthdate'   : userData.birthdate,
          'username'    : userData.username,
          'password'    : userData.password,
          'role'        : userData.role,
          'permission'  : userData.permission
      };
      return $http.post($constants.serverUrl + $constants.services.createUser, data);
  }
  
  return self;
};