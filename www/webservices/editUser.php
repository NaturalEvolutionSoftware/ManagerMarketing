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
	@$birthdate = $request->strbirthdate;
	@$role= $request->role;
	@$mail= $request->mail;
	@$permission= $request->permission;
	
$ValidationQuery = "SELECT id FROM users where cc = $cc";
$ValidationResult = mysql_query($ValidationQuery) or die(mysql_error());
$isCC = mysql_num_rows($ValidationResult);
$isNit = 0;

if($isCC == 0){
	$SecValidationQuery = "SELECT id FROM company where nit = $cc";
	$SecValidationResult = mysql_query($SecValidationQuery) or die(mysql_error());
	$isNit = mysql_num_rows($SecValidationResult);
}

if ($isNit == 1 || $isCC == 1){
	
	if($isNit == 1){
		print json_encode(json_decode('{"isNit" : true}'));
	}
	else{
		if($isCC == 1){
			print json_encode(json_decode('{"isCC" : true}'));
		}
	}
}else
{	
	$Query = "	UPDATE `users` SET 	
		`name` = '$name', 
		`lastname` = '$lastname', 
		`birthdate` = '$birthdate',
		`username` = '$username',
		`mail` = '$mail',
		`role` = '$role', 
		`permission` = '$permission', 
		`cc` = '$cc'
		WHERE `users`.`id` = $id";

	$result = mysql_query($Query)or die(mysql_error());
	if ($result) {
	print json_encode(json_decode('{"status": true}'));
	} else {
		print json_encode(json_decode('{"status": false}'));
	}
}

mysql_close($dbhandle);
?>