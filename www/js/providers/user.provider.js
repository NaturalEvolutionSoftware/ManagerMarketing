angular.module('App').factory('$users', userService);

userService.$inject = ['$constants', '$http', '$utils'];
function userService($constants, $http, $utils){ 
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
      userData.password = CryptoJS.MD5(userData.password).toString(CryptoJS.enc.Base64);
      userData.strbirthdate = $utils.getDateString(userData.birthdate);
      return $http.post($constants.serverUrl + $constants.services.createUser, userData);
  }
  
  function delUser(user){
      var data = {'userId' : user};
      return $http.post($constants.serverUrl + $constants.services.deleteUser, data);
  }
  
  function modifyUser(userData){
      userData.strbirthdate = $utils.getDateString(userData.birthdate);
      return $http.post($constants.serverUrl + $constants.services.editUser, userData);
  }
  
  function editPassword(userData){
      userData.password = CryptoJS.MD5(userData.password).toString(CryptoJS.enc.Base64);
      return $http.post($constants.serverUrl + $constants.services.editPassword, userData);
  }
  
  return self;
};