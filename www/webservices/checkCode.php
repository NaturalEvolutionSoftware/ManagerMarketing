<?php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$code = $request->code;
    
//execute the SQL query and return records
$Query = "SELECT `userId` FROM `recover` WHERE `recover`.`code` = '$code'";
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