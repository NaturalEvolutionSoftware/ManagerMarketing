<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	
	@$userId = $request->userId;
	 
	

$Query = "DELETE FROM `users` WHERE `users`.`id` = $userId";

if (mysql_query($Query)) {
   print json_encode(json_decode('{"estado": "VERDADERO"}'));
} else {
    print json_encode(json_decode('{"estado": "FALSO"}'));
}

mysql_close($dbhandle);
?>