<?php


$username = "root";
$password = "";
$hostname = "localhost"; 
$db = "mm";

session_start();	

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password);
 //or die("Unable to connect to MySQL");
//echo "Connected to MySQL<br>";


//select a database to work with
$selected = mysql_select_db($db,$dbhandle);
  //or die("Could not select MM");

?>