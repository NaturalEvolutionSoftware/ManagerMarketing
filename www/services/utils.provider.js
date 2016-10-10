angular.module('starter').factory('$utils', utilsService);

utilsService.$inject = ['$constants'];
function utilsService($constants){
  var constants = $constants.getConstants();
  var self= {
      'getRoleName' : returnRoleName,
      'getSubCompanyType' : getCompanyType
  };
  
  function returnRoleName(userRole){
      switch(userRole){
          case constants.roles.superadmin : {
              return constants.roleTags.superadmin;
          }
          
          case constants.roles.admin : {
              return constants.roleTags.admin;
          }
      }
  }
  
   function getCompanyType(parentType){
      switch(parentType){
          case constants.companyTypes.systemAdmin:{
              return constants.companyTypes.distributor;
          }
          
          case constants.companyTypes.distributor:{
              return constants.companyTypes.subDistributor;
          }
          
          case constants.companyTypes.subDistributor:{
              return constants.companyTypes.channel;
          }
          
          case constants.companyTypes.channel:{
              return constants.companyTypes.salepoint;
          }
      }
  }
  
  return self;
};