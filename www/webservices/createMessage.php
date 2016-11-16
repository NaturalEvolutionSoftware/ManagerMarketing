<?php
// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
    @$userId	=  $request->userId;
    @$motive	=  $request->motive;
	@$message 	=  $request->message;
    @$date 		=  $request->date;
	
$Query = "INSERT INTO contact VALUES(NULL,
'$userId',
'$motive',
'$message',
'$date',
0
)";

$result = mysql_query($Query) or die(mysql_error());

if ($result) {
   print json_encode(json_decode('{"status": true}'));
} else {
    print json_encode(json_decode('{"status": false}'));
}

mysql_close($dbhandle);
?>