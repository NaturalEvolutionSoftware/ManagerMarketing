<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	@$id = $request->id;
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
	

$Query = "	UPDATE `users` SET 	
	`name` = '$name', 
	`lastname` = '$lastname', 
	`fechanacimiento` = '$birthdate', 
	`username` = '$username', 
	`password` = '$password', 
	`role` = '$role', 
	`cc` = $cc, 
	`permission` = $permission 
	WHERE `users`.`id` = $id";

if (mysql_query($Query)) {
   print json_encode(json_decode('{"estado": "VERDADERO"}'));
} else {
    print json_encode(json_decode('{"estado": "FALSO"}'));
}

mysql_close($dbhandle);
?>