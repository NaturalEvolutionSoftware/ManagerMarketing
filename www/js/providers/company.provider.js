angular.module('App').factory('$company', companyService);

companyService.$inject = ['$users', '$constants', '$http'];
function companyService($users, $constants, $http){
    
  var companies;
    
  var self= {
      'getCompany'       : getCompanyInfo,
      'createCompany'    : newCompany,
      'deleteCompany'    : delCompany,
      'getUsers'         : getCompanyUsers,
      'getSubCompanies'  : getChildCompanies,
      'editCompany'      : modifyCompany,
      'getSuperAdmin'    : getSuperAdmin
  };
  
  function getCompanyInfo(company){
       var data = {'companyId' : company};
       return $http.post($constants.serverUrl + $constants.services.getCompany, data);
  }
  
  function getCompanyUsers(company){
      var data = {'companyId' : company};
      return $http.post($constants.serverUrl + $constants.services.getCompanyUsers, data);
  }
  
  function getChildCompanies(company){
      var data = {'companyId' : company};
      return $http.post($constants.serverUrl + $constants.services.getSubCompanies, data);
  }
  
  function newCompany(companyData){
      return $http.post($constants.serverUrl + $constants.services.createCompany, companyData);
  }
  
  function delCompany(companyId){
      var data = {'companyId' : companyId};
      return $http.post($constants.serverUrl + $constants.services.deleteCompany, data);
  }
  
  function modifyCompany(companyData) {
      return $http.post($constants.serverUrl + $constants.services.editCompany, companyData);
  }
  
  function getSuperAdmin(companyId){
      var data = {
          'companyId' : companyId
      }
      return $http.post($constants.serverUrl + $constants.services.getSuperAdmin, data);
  }
 
  return self;
};