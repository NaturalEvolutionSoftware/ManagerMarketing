<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	@$id = $request->companyId;
    @$name = $request->name;
	@$nit = $request->nit;
	
$Query = "	UPDATE `company` SET 	
	`name` = '$name',  
	`nit` = '$nit'
	WHERE `company`.`id` = $id";
    
$ValidationQuery = "SELECT id FROM company where nit = $nit and id <> $id";
$ValidationResult = mysql_query($ValidationQuery) or die(mysql_error());

if (mysql_num_rows($ValidationResult)!=0){
	print json_encode(json_decode("{}"));
}else
{
    $result = mysql_query($Query)or die(mysql_error());
    if ($result) {
    print json_encode(json_decode('{"status": true}'));
    } else {
        print json_encode(json_decode('{"status": false}'));
    }
}

mysql_close($dbhandle);
?>