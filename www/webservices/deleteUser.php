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
$result = mysql_query($Query);

if ($result) {
   print json_encode(json_decode('{"status": true}'));
} else {
   print json_encode(json_decode('{"status": false}'));
}

mysql_close($dbhandle);
?>