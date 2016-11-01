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
	
//(`id`, `name`, `lastname`, `birthdate`, `username`, `password`, `role`, `cc`, `companyId`, `permission`, `created_at`, `updated_at`) 
$Query = "INSERT INTO users VALUES (NULL, 
'$name', 
'$lastname', 
'$birthdate', 
'$username', 
'$password', 
'$role', 
'$cc', 
'$companyId', 
'$permission', 
NULL, NULL)";

$result = mysql_query($Query) or die(mysql_error());
if ($result) {
   print json_encode(json_decode('{"status": true}'));
} else {
    print json_encode(json_decode('{"status": false}'));
}

mysql_close($dbhandle);
?>