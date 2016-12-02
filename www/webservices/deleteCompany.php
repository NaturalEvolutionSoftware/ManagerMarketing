<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	@$companyId = $request->companyId;
	 
deleteSelections($companyId);

print json_encode(json_decode('{"status": true}'));

mysql_close($dbhandle);


function deleteSelections($id) {
	
    $Query = "DELETE FROM `company` WHERE `company`.`id` = $id";
	$result = mysql_query($Query) or die(mysql_error());

	$Query = "DELETE FROM `users` WHERE `users`.`companyId` = $id";
	$result = mysql_query($Query) or die(mysql_error());
	
	$selQuery = "SELECT id FROM `company` WHERE `company`.`parentCompany` = $id";
    $selResult = mysql_query($selQuery);
	$rows = mysql_num_rows($selResult);
	
	if($rows > 0){
		while($row = mysql_fetch_array($selResult)) {
		   deleteSelections($row["id"]);
		}
	}
}
?>