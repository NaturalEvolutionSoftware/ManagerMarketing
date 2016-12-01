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
    
$ValidationQuery = "SELECT id FROM company where nit = $nit";
$ValidationResult = mysql_query($ValidationQuery) or die(mysql_error());
$isNit = mysql_num_rows($ValidationResult);
$isCC = 0;

if($isNit == 0){
	$SecValidationQuery = "SELECT id FROM users where cc = $nit";
	$SecValidationResult = mysql_query($SecValidationQuery) or die(mysql_error());
	$isCC = mysql_num_rows($SecValidationResult);
}

if ($isNit == 1 || $isCC == 1){
	
	if($isNit == 1){
		print json_encode(json_decode('{"isNit" : true}'));
	}
	else{
		if($isCC == 1){
			print json_encode(json_decode('{"isCC" : true}'));
		}
	}
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