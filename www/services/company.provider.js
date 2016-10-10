angular.module('starter').factory('$company', companyService);

companyService.$inject = ['$users', '$constants'];
function companyService($users, $constants){
    
  var constants = $constants.getConstants();
  var companies;
    
  var self= {
      'getCompany' : getCompanyInfo,
      'addSubCompany' : newCompany,
      'removeSubCompany' : delCompany,
      'addUserToCompany' : addUser,
      'removeUserFromCompany' : removeUser,
      'getUsers' : getCompanyUsers,
      'getSubCompanies' : getChildCompanies,
      'getSuperAdmin'   : getCompanySuperAdmin
  };
  
  function init(){
    //localStorage.clear();
    if(!localStorage.getItem(constants.localstorage.companies)){  
       localStorage.setItem(constants.localstorage.companies, JSON.stringify(constants.mocks.companies));  
    }
    companies = JSON.parse(localStorage.getItem(constants.localstorage.companies));
    console.log(companies);
}
  
  function getCompanyInfo(company){
      return companies[company]; 
  }
  
  function getCompanyUsers(company){
      var users = [];
      companies[company].users.forEach(function(user){if(user!==null){users.push($users.getUser(user).data)};});
      return users;
  }
  
  function getChildCompanies(company){
      var subcompanies = [];
      companies[company].subcompanies.forEach(function(company){if(company!==null){subcompanies.push(getCompanyInfo(company))};});
      return subcompanies;
  }
  
  function newCompany(companyId, companyData){
      var keys = Object.keys(companies);
      var newkey = parseInt(keys[keys.length - 1]) + 1;
      var strNewKey = newkey + '';
      
      if(companies.hasOwnProperty(strNewKey)){
          return false;
      }else{
          companyData.id = strNewKey;
          companies[strNewKey] =  companyData;
          companies[companyId].subcompanies.push(strNewKey);
          localStorage.setItem(constants.localstorage.companies, JSON.stringify(companies));
          return true;
      }
  }
  
  function delCompany(companyId, subcompanyId){
      
      if(companies.hasOwnProperty(subcompanyId)){
         
        var users = companies[subcompanyId].users;
        var subcompanies = companies[subcompanyId].subcompanies;
        
        users.forEach(function(user) {
            $users.deleteUser(user);
        })
        
        subcompanies.forEach(function(subcompany) {
            delCompany(subcompanyId, subcompany);
        })
          
        delete companies[subcompanyId];

        var idx = companies[companyId].subcompanies.indexOf(subcompanyId);
      
        if(idx >= 0){
            companies[companyId].subcompanies.splice(idx, 1);
            localStorage.setItem(constants.localstorage.companies, JSON.stringify(companies));
            return true;
        }else{
            return false;
        }
      }
      return false;
  }
  
  function setSubcompany(companyId, companyData){
      companies[companyId].subcompanies.push(newCompany(companyData));
      localStorage.setItem(constants.localstorage.companies, JSON.stringify(companies));
  }
  
  function addUser(companyId, userData){
      
      if($users.createUser(userData.data.id, userData)){
        companies[companyId].users.push(userData.data.id);
        localStorage.setItem(constants.localstorage.companies, JSON.stringify(companies));
        return true;
      }else{
          return false;
      }
  }
  
  function removeUser(companyId, userId){
      var idx = companies[companyId].users.indexOf(userId);
      
      if(idx >= 0 && $users.deleteUser(userId)){
          companies[companyId].users.splice(idx, 1);
          localStorage.setItem(constants.localstorage.companies, JSON.stringify(companies));
          return true;
      }else{
          return false;
      }
  }
  
  function getCompanySuperAdmin(companyId){
      var data = '';
      companies[companyId].users.forEach(function(user){
          if($users.getUser(user).data.roleLvl === constants.roles.superadmin){
                data = $users.getUser(user).data;
                return;
          }
      });
      return data;
  }
  
  init();
  
  return self;
};