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
	
$ValidationQuery = "SELECT id FROM company where nit = $nit";
$ValidationResult = mysql_query($ValidationQuery) or die(mysql_error());

if (mysql_num_rows($ValidationResult)!=0){
	print json_encode(json_decode("{}"));
}else
{
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
}

mysql_close($dbhandle);
?>