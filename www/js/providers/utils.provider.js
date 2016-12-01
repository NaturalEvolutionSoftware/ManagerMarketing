angular.module('App').factory('$utils', utilsService);

utilsService.$inject = ['$constants'];
function utilsService($constants){
    
  var self= {
      'getRoleName' : returnRoleName,
      'getSubCompanyType' : getCompanyType,
      'getCompanyTag' : returnCompanyTag,
      'getDateString' : getStrDate,
      'checkPassword' : validatePassword,
      'checkEmail'    : validateEmail,
      'checkName'     : validateName,
      'checkDate'     : validateDate,
      'checkCargo'    : validateCargo,
      'checkId'       : validateId,
      'checkRazonSocial' : validateRazonSocial
  };
  
  function returnRoleName(userRole){
      switch(userRole){
          case $constants.roles.superadmin : {
              return $constants.roleTags.superadmin;
          }
          
          case $constants.roles.admin : {
              return $constants.roleTags.admin;
          }
      }
  }
  
   function getCompanyType(parentType){
      switch(parentType){
          case $constants.companyTypes.systemAdmin:{
              return $constants.companyTypes.distributor;
          }
          
          case $constants.companyTypes.distributor:{
              return $constants.companyTypes.subDistributor;
          }
          
          case $constants.companyTypes.subDistributor:{
              return $constants.companyTypes.channel;
          }
          
          case $constants.companyTypes.channel:{
              return $constants.companyTypes.salepoint;
          }
      }
  }
  
  function returnCompanyTag(companyType){
      
      switch(companyType){
          case $constants.companyTypes.systemAdmin:{
              return $constants.companyTags.systemAdmin;
          }
          
          case $constants.companyTypes.distributor:{
              return $constants.companyTags.distributor;
          }
          
          case $constants.companyTypes.subDistributor:{
              return $constants.companyTags.subDistributor;
          }
          
          case $constants.companyTypes.channel:{
              return $constants.companyTags.channel;
          }
          
          case $constants.companyTypes.salepoint:{
              return $constants.companyTags.salepoint;
          }
      }
  }
  
  function getStrDate(date){
      var MyDateString = date.getFullYear() + '-'
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2);
      
      return MyDateString + ' 00:00:00';
  }
  
  function validatePassword(password, confirm){
       
       if(password !== confirm){
            alert('Las contraseñas no coinciden');
            return false;
        }
        
        if(password.length < 5){
            alert('La contraseña debe tener al menos 5 caracteres');
            return false;
        }
        
        if (password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/) === null) {
            alert('la contraseña debe tener al menos un número y una letra');
            return false;
        }
        
        return true;
  }
  
  function validateEmail($, $alert){
      var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i; 
      
      if ($.match(regex) === null) {
            if($alert){
                alert('Correo electrónico inválido');
            }
            return false;
      }
      
      return true;
  }
  
  function validateName($, $alert){
      //var regex = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{3,}$/g;
      var regex = /^[a-zA-Z ]+$/;
      
      if ($.match(regex) === null) {
          if($alert){
            alert('Nombre o Apellido inválido. Evite números y caracteres especiales');
        }
        return false;
      }
      
      if($.trim().length < 3){
          if($alert){
            alert('Nombre o Apellido muy corto. Deben tener mas de 3 caracteres ');
          }
            return false;
      }
      
      return true;
  }
  
  function validateCargo($, $alert){
      var regex = /^[a-zA-Z0-9 ]+$/;
      if ($.match(regex) === null) {
          if($alert){
         alert('Cargo inválido. Debe evitar el uso de caracteres especiales');
        }
        return false;
      }
      
      if ($.trim().length < 3) {
          if($alert){
         alert('Cargo inválido. Debe tener al menos 3 caracteres.');
        }
        return false;
      }
      
      return true;
  }
  
   function validateRazonSocial($, $alert){
      var regex = /^[a-zA-Z0-9]+$/;
      if ($.match(regex) === null) {
          if($alert){
         alert('Razon Social inválida. Debe evitar el uso de caracteres especiales');
        }
        return false;
      }
      
      if ($.trim().length < 3){
          if($alert){
         alert('Razon Social inválida. Debe tener al menos 3 caracteres.');
        }
        return false;
      }
      
      return true;
  }
  
  
  function validateDate($, $alert){
      var d = new Date();
      var n = d.getFullYear();
      var dif = n - $.getFullYear();
      if(dif < 15){
         if($alert){
            alert('Fecha inválida. El usuario debe ser mayor de 15 años');
         }
         return false;
      } 
      
      if(dif > 100){
         if($alert){
            alert('Fecha inválida. El usuario no puede ser mayor de cien años.');
         }
         return false;
      } 
      return true;
}
  
  function validateId($, $alert){

      if($ < 0 || $.toString().length < 8){
            if($alert){
            alert('Número de identificación inválido. Debe ser un entero positivo de al menos 8 caracteres.')
          }
          return false;
      }
      
      var regex = /^[0-9]*$/;
      
      if ($.toString().match(regex) === null) {
          if($alert){
            alert('Número de identificación inválido. Evite caracteres especiales');
          }
          return false
      }
      
      return true;
  }
  
  return self;
};