<?php

//LOCAL 
/*
$username = "bubbles";
$password = "2785157";
$hostname = "localhost"; 
$db = "mm";
*/

//SERVIDOR

//LOCAL
$username = "n260m_19004841";
$password = "pfq8hz9x";
$hostname = "sql300.260mb.net"; 
$db = "n260m_19004841_mm";


session_start();	

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password);
 //or die("Unable to connect to MySQL");
//echo "Connected to MySQL<br>";


//select a database to work with
$selected = mysql_select_db($db,$dbhandle);
  //or die("Could not select MM");

?>