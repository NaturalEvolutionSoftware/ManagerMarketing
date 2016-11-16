angular.module('App').factory('$contact', contactService);

contactService.$inject = ['$constants', '$http'];
function contactService($constants, $http){ 
  var users;
    
  var self= {
      'getNonReadMessages' : getRegularMessages,
      'sendMessage'        : createMessage
  };
  
  function getRegularMessages(user){
      var data = {'userId' : user};
      return $http.post($constants.serverUrl + $constants.services.getMessages, data);
  }
  
  function createMessage(messageData){
      return $http.post($constants.serverUrl + $constants.services.createMessage, messageData);
  }
 
  return self;
};