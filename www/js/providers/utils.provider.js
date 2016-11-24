angular.module('App').factory('$utils', utilsService);

utilsService.$inject = ['$constants'];
function utilsService($constants){
    
  var self= {
      'getRoleName' : returnRoleName,
      'getSubCompanyType' : getCompanyType,
      'getCompanyTag' : returnCompanyTag,
      'getDateString' : getStrDate,
      'checkPassword' : validatePassword
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
  
  return self;
};