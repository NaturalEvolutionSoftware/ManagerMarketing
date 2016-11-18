angular.module('App').factory('$constants', constantService);

constantService.$inject = [];
function constantService(){
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
             'basic'      : '3'
         },
         'roleTags' : {
           'superadmin' : 'ADMINISTRADOR',
           'admin'      : 'administrador'
         },
         'routes' : {
             'private' : {
                'main'     : '/private/main',
                'users'    : '/private/users',
                'data'     : '/private/data',
                'contact'  : '/private/contact',
                'backup'   : '/private/backup'
            },
            'public' : {
                'login'     : '/public/login',
                'forgot'    : '/public/forgot'
            },
             'modals' : {
                 'newUser' : 'views/modals/newUser.modal.html',
                 'newCompany' : 'views/modals/newCompany.modal.html',
                 'newSuperAdmin' : 'views/modals/newSuperAdmin.modal.html',
                 'newPassword' :   'views/modals/newPassword.modal.html'
             }
         },
         'companyTypes' : {
             'systemAdmin' : '0',
             'distributor' : '1',
             'subDistributor' : '2',
             'channel' : '3',
             'salepoint' : '4',
         },
         'companyTags' : {
             'systemAdmin' : 'Administrador del sistema',
             'distributor' : 'Distribuidor',
             'subDistributor' : 'Subdistribuidor',
             'channel'   : 'Canal',
             'salepoint' : 'Punto de venta'
         },
         'serverUrl' : 'webservices/',
         'services'  : {
             'login'           : 'login.php',
             'logout'          : 'logout.php',
             'getSession'      : 'getSession.php',
             'createUser'      : 'createUser.php',
             'editUser'        : 'editUser.php',
             'deleteUser'      : 'deleteUser.php',
             'createCompany'   : 'createCompany.php',
             'editCompany'     : 'editCompany.php',
             'deleteCompany'   : 'deleteCompany.php',
             'getCompany'      : 'getCompany.php',
             'getCompanyUsers' : 'getCompanyUsers.php',
             'getSubCompanies' : 'getSubCompanies.php',
             'getSuperAdmin'   : 'getSuperAdmin.php',
             'editPassword'    : 'changePassword.php',
             'getUser'         : 'getUser.php',
             'createMessage'   : 'createMessage.php',
             'getMessages'     : 'getMessages.php',
             'getUserForgot'   : 'getUserForgot.php',
             'sendCode'        : 'sendCode.php',
             'checkCode'       : 'checkCode.php',
             'backup'          : 'backup.php',
             'restore'         : 'restore.php'
         },
         'popups' : {
             'confirmUserDelete' : { 'title': 'Eliminar Usuario', 'template': 'Desea eliminar?'},
             'confirmCompanyDelete' : { 'title': 'Eliminar Empresa', 'template': 'Desea eliminar?'},
             'confirmSuperAdminDelete' : { 'title': 'Eliminar Super Administrador', 'template': 'Desea eliminar?'},
             'confirmBackup' : { 'title': 'Restaurar Sistema', 'template': 'Está seguro que desea restaurar el sistema? Los datos que no hayan sido consignados en el archivo de respaldo se perderán.'}
         },
         'newUserOptions' : [{id: 1, label: 'Administrador'}, {id: 2,label: 'Consulta'}, {id: 3, label: 'Básico'}],
         'editUserOptionsSuperAdmin' : [{id: 0, label: 'Super Administrador'}, {id: 1, label: 'Administrador'}, {id: 2,label: 'Consulta'}, {id: 3, label: 'Básico'}]
      }
};