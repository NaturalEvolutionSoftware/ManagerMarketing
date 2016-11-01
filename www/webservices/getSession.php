<?php

require 'conexion.php';

if (!isset($_SESSION['id'])) {

	print json_encode(json_decode("{}"));

} else {
	$userId=$_SESSION['id'];
	$result = mysql_query("SELECT * FROM users where id = $userId");
	$row = mysql_fetch_assoc($result);
	print json_encode($row);
}

mysql_close($dbhandle);
?>