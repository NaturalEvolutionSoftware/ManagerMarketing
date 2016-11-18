angular.module('App').factory('$backup', backupService);

backupService.$inject = ['$constants', '$http'];
function backupService($constants, $http){ 
  var users;
    
  var self= {
      'download' : downloadDB,
      'apply' : applySQLFile
  };
  
  function applySQLFile(fd){
      return $http.post($constants.serverUrl + $constants.services.restore, fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
      });
  }
  
  function downloadDB(){
      window.location.href = 'webservices/backup.php';
  }
 
  return self;
};