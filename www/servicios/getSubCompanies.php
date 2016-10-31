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
$result = mysql_query("SELECT `id`,`parentCompany`,`name` FROM `company` where `company`.`parentCompany` = $companyId");
//$result = mysql_query("SELECT `id`,`parentCompany`,`name` FROM `company` where `company`.`parentCompany` = 2");



if (mysql_num_rows($result)==0){	
	print json_encode(json_decode("{}"));
	}else
{
	
	//$row = mysql_fetch_assoc($result);
	
		
	//$row = mysql_fetch_array($result);

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    //printf("ID: %s  Name: %s", $row[0], $row[1]);  
	print json_encode($row);
	}

	
	
	//print json_encode($row);	
	
}

mysql_close($dbhandle);
?>