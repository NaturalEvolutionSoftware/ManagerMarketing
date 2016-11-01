<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
    @$name = $request->name;
    @$lastname = $request->lastname;
	@$username = $request->username;
    @$cc = $request->cc;
	@$birthdate = $request->birthdate;
    @$username = $request->username;
	@$password = $request->password;
    @$companyId = $request->companyId;
	@$role= $request->role;
    @$permission = $request->permission;
	

  	
	
	
$Query = "INSERT INTO `users` (`id`, `name`, `lastname`, `fechanacimiento`, `username`, `password`, `role`, `cc`, `companyId`, `permission`, `created_at`, `updated_at`) 
VALUES (NULL, 
'$name', 
'$lastname', 
'$birthdate', 
'$username', 
'$password', 
'admin', 
$cc, 
$companyId, 
$permission, 
NULL, NULL)";	
	
/*
$Query="INSERT INTO `users` (`id`, `name`, `lastname`, `fechanacimiento`, `username`, `password`, `role`, `cc`, `companyId`, `permission`, `created_at`, `updated_at`) 
VALUES (NULL, 
'Eduin', 
'CUlma', 
'2016-10-18', 
'edculma88', 
'2785157', 
'admin', 
'113213213', 
'1', 
'5', 
NULL, NULL)";
*/
	
if (mysql_query($Query)) {
   print json_encode(json_decode('{"estado": "VERDADERO"}'));
} else {
    print json_encode(json_decode('{"estado": "FALSO"}'));
}

mysql_close($dbhandle);
?>