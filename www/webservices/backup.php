<?php 
include("conexion.php"); 
$fechaDeLaCopia = "_".date("d_m_Y");     
$ficheroDeLaCopia =$db.$fechaDeLaCopia.".sql"; 
$sistema="show variables where variable_name= 'basedir'"; 
$restore=mysql_query($sistema); 
$DirBase=mysql_result($restore,0,"value"); 
$primero=substr($DirBase,0,1); 


if ($primero=="/") { 
    $DirBase="mysqldump"; 
}  
else  
{ 
    $DirBase=$DirBase."\bin\mysqldump"; 
} 

$executa="$DirBase --host=$hostname --user=$username --password=$password -R -c  --add-drop-table $db > $ficheroDeLaCopia"; 
system($executa); 

header( "Content-Disposition: attachment; filename=".$ficheroDeLaCopia.""); 
header("Content-type: application/force-download"); 
@readfile($ficheroDeLaCopia); 

unlink($ficheroDeLaCopia); 

?>