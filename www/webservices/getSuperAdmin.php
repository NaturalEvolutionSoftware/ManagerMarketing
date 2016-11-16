<?php
require 'conexion.php';
   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$companyId = $request->companyId;
  
//execute the SQL query and return records
$Query = "SELECT id, name, lastname, cc, birthdate, username, role FROM users where companyId = $companyId AND permission = 0";
$result = mysql_query($Query) or die(mysql_error());

if (mysql_num_rows($result)==0){	
	print json_encode(json_decode("{}"));
}else
{
	$row = mysql_fetch_assoc($result);
	print json_encode($row);
}

mysql_close($dbhandle);
?>