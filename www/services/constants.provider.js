angular.module('starter').factory('$constants', constantService);

constantService.$inject = [];
function constantService(){
  var self= {
      'getConstants' : returnConstants
  };
  
  function returnConstants(){
      return {
         'mocks' : {
             'users' :    { 'hsanchez':{'password' : '13579','data' : {'id': 'hsanchez', 'name' : 'Harry Alexis','lastname' : 'Sanchez Norato', 'company' : '1','role' : 'ADMINISTRADOR', 'roleLvl' : '0'}}},
             'companies' : {'1' : {'id':'1','category': '0', 'name' : 'Natural Evolution Software SAS', 'users': ['hsanchez'], 'subcompanies' : []}}
         },
         'localstorage' : {
             'users' : 'users',
             'companies' : 'companies'
         },
         'roles' : {
             'superadmin' : '0',
             'admin'      : '1',
             'query'      : '2',
             'other'      : '3'
         },
         'roleTags' : {
           'superadmin' : 'ADMINISTRADOR',
           'admin'      : 'administrador'
         },
         'routes' : {
             'modals' : {
                 'newUser' : 'views/modals/newUser.modal.html',
                 'newCompany' : 'views/modals/newCompany.modal.html',
                 'newSuperAdmin' : 'views/modals/newSuperAdmin.modal.html'
             }
         },
         'companyTypes' : {
             'systemAdmin' : '0',
             'distributor' : '1',
             'subDistributor' : '2',
             'channel' : '3',
             'salepoint' : '4',
         }
      }
  }
  
  return self;
};