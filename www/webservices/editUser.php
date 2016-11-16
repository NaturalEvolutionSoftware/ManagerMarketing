<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	@$id = $request->userId;
    @$name = $request->name;
	@$username = $request->username;
    @$lastname = $request->lastname;
    @$cc = $request->cc;
	@$birthdate = $request->birthdate;
	@$role= $request->role;
	@$mail= $request->mail;
	
$Query = "	UPDATE `users` SET 	
	`name` = '$name', 
	`lastname` = '$lastname', 
	`birthdate` = '$birthdate',
	`username` = '$username',
	`mail` = '$mail',
	`role` = '$role', 
	`cc` = '$cc'
	WHERE `users`.`id` = $id";

$result = mysql_query($Query)or die(mysql_error());
if ($result) {
   print json_encode(json_decode('{"status": true}'));
} else {
    print json_encode(json_decode('{"status": false}'));
}

mysql_close($dbhandle);
?>