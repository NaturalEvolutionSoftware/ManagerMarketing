angular.module('starter').factory('$users', userService);

userService.$inject = ['$constants'];
function userService($constants){ 
  var constants = $constants.getConstants();  
  var users;
    
  var self= {
      'getUser' : getUserInfo,
      'createUser' : newUser,
      'deleteUser' : delUser
  };
  
  function init(){
     //localStorage.clear();
    if(!localStorage.getItem(constants.localstorage.users)){  
     localStorage.setItem(constants.localstorage.users, JSON.stringify(constants.mocks.users));  
    }
    users = JSON.parse(localStorage.getItem(constants.localstorage.users));
    console.log(users);
  }
  
  function getUserInfo(user){
      var resp = users.hasOwnProperty(user) ? users[user] : null;
      return resp;
  }
  
  function newUser(userId, userData){
      if(users.hasOwnProperty(userId)){
          return false;
      }else{
          users[userId] =  userData;
          localStorage.setItem(constants.localstorage.users, JSON.stringify(users));
          return true;
      }
  }
  
  function delUser(userId){
      if(users.hasOwnProperty(userId)){
        delete users[userId];
        localStorage.setItem(constants.localstorage.users, JSON.stringify(users));
        return true;  
      }
      return false;
  }
  
  init();
  return self;
};