angular.module('App').factory('$utils', utilsService);

utilsService.$inject = ['$constants'];
function utilsService($constants){
    
  var self= {
      'getRoleName' : returnRoleName,
      'getSubCompanyType' : getCompanyType,
      'getCompanyTag' : returnCompanyTag
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
  
  return self;
};