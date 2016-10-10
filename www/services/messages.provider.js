angular.module('starter').factory('$messages', messagesService);

messagesService.$inject = [];
function messagesService(){
  var self= {
      'getMessages' : returnMessages 
  };
  
  function returnMessages(){
      return {
          'views' : {
              'login' : {
                  'title': 'Administrador de comerciantes',
                  'tags' : {
                      'buttons': {
                          'submit': 'Iniciar Sesión',
                          'forgotPass' : 'Olvidé mi contraseña'
                      },
                      'inputs': {
                          'usernameLabel' : 'Nombre de Usuario',
                          'passwordLabel' : 'Contraseña'
                      }
                  },
                  'messages' : {
                      'welcome' : 'Inicia sesión para comenzar a administrar tu empresa.'
                  }
              }
          }
      }
  }
  
  return self;
};