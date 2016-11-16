<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
    @$companyId = $request->companyId;
   
  
//execute the SQL query and return records
$Query = "SELECT `id`, `nit`, `name` FROM `company` where `company`.`parentCompany` = $companyId";
$result = mysql_query($Query);

if (mysql_num_rows($result)==0){	
	print json_encode(json_decode("[]"));
	}else
{
	$responseArray = array();
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		array_push($responseArray, $row);
	}
	print json_encode($responseArray);
}

mysql_close($dbhandle);
?>