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
	@$birthdate = $request->strbirthdate;
    @$username = $request->username;
	@$password = $request->password;
	@$mail = $request->mail;
    @$companyId = $request->companyId;
	@$role= $request->role;
    @$permission = $request->permission;
	
$ValidationQuery = "SELECT id FROM users where cc = $cc";
$ValidationResult = mysql_query($ValidationQuery) or die(mysql_error());

if (mysql_num_rows($ValidationResult)!=0){
	print json_encode(json_decode("{}"));
}else
{
	$Query = "INSERT INTO users VALUES (NULL, 
    '$name', 
    '$lastname', 
    '$birthdate', 
    '$username', 
    '$password',
    '$mail',
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
}

mysql_close($dbhandle);
?>