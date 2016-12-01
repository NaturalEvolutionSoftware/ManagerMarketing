<?php
// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
    @$userId =  $request->userId;
	@$companyId =  $request->companyId;

    $Query = "UPDATE users
	SET permission=1
	WHERE permission=0
	AND companyId = $companyId";

    $result = mysql_query($Query) or die(mysql_error());

    if ($result) {
        
		$newQuery = "UPDATE users
		SET permission = 0
		WHERE id = $userId";
		
		$newResult = mysql_query($newQuery) or die(mysql_error());
		
		if($newResult){
			print json_encode(json_decode('{"status": true}'));
		}else{
			print json_encode(json_decode('{"status": false}'));
		}
		
    } else {
        print json_encode(json_decode('{"status": false}'));
    }


mysql_close($dbhandle);
?>