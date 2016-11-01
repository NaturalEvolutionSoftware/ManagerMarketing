<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
    @$user = $request->username;
    @$pass = $request->password;
	
//execute the SQL query and return records
$Query = "SELECT id, name, lastname, cc, birthdate, companyId, role, permission FROM users where username = '$user' and password = '$pass'";
$result = mysql_query($Query) or die(mysql_error());

if (mysql_num_rows($result)==0){	
	print json_encode(json_decode("{}"));
}else
{
	$row = mysql_fetch_assoc($result);
	$_SESSION['id'] = $row{'id'};
	print json_encode($row);
}

mysql_close($dbhandle);
?>