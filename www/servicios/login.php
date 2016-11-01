<?php


// archivo index.php

require 'conexion.php';

   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
    @$user = $request->username;
    @$pass = $request->pass;
	

  
//execute the SQL query and return records
$result = mysql_query("SELECT * FROM users where usuario = '$user' and password = '$pass'");
//$result = mysql_query("SELECT * FROM users where username = 'jcatenciaa' and password = '2785157'");

if (mysql_num_rows($result)==0){	
	print json_encode(json_decode("{}"));
	}else
{
	
	$row = mysql_fetch_assoc($result);
	
	$_SESSION['id'] = $row{'id'};
	
	print json_encode($row);
	print $_SESSION['id'];
	
}

//fetch tha data from the database 
/*while ($row = mysql_fetch_array($result)) {
   echo "ID:".$row{'id'}."  Nombre:".$row{'name'}."   Cedula: ". //display the results
   $row{'ncedula'}."<br>";
}*/
//close the connection
mysql_close($dbhandle);
?>