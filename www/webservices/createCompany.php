<?php
// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
    @$parentCompany =  $request->parentCompany;
    @$nit 			=  $request->nit;
	@$name 			=  $request->name;
    @$category 		=  $request->category;
	
 
$Query = "INSERT INTO company VALUES(NULL,
'$parentCompany',
'$nit',
'$name',
'$category'
)";

$result = mysql_query($Query) or die(mysql_error());

if ($result) {
   print json_encode(json_decode('{"status": true}'));
} else {
    print json_encode(json_decode('{"status": false}'));
}

mysql_close($dbhandle);
?>