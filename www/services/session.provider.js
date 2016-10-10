angular.module('starter').factory('$session', sessionService);

sessionService.$inject = [];
function sessionService(){
  var self= {
      'setAuthenticatedUser' : setAuthUser,
      'getUserData' : getAuthUser,
      'isUserAuthenticated' : checkUser
  };
  
  var authUser = null;
  
  function setAuthUser(userdata){
      authUser = userdata
  }
  
  function getAuthUser(){
      return authUser;
  }
  
  function checkUser(){
      return authUser !== null;
  }
  
  return self;
};