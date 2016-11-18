<?php 
include ("conexion.php"); 
if (!isset ($_FILES["recover"])) 
{ 
  echo "no esta incluido";
} 
 else  
 {
 
 $archivoRecibido=$_FILES["recover"]["tmp_name"]; 
 $destino="./ficheroParaRestaurar.sql"; 
     
if (!move_uploaded_file ($archivoRecibido, $destino)) 
{ 
$mensaje='EL proceso ha fallado'; 
echo $mensaje; 
} 
$sistema="show variables where variable_name= 'basedir'"; 
$restore=mysql_query($sistema); 
$DirBase=mysql_result($restore,0,"value"); 
$primero=substr($DirBase,0,1); 
if ($primero=="/") { 
    $DirBase="/bin/mysql"; 
}  
else  
{ 
    $DirBase=$DirBase."\bin\mysql"; 
} 

$executa = "$DirBase -h $hostname -u $username --password=$password  $db < $destino"; 
system($executa,$resultado); 
if ($resultado)  
{  
echo "<H3>Error ejecutando comando: $executa</H3>\n"; 
$mensaje="ERROR. La copia de seguridad no se ha restaurado."; 
$cabecera="COPIA DE SEGURIDAD NO RESTAURADA"; 
echo $mensaje; 
echo "<meta http-equiv='Refresh' content='3;url=../index.html'>"; 
}  
else  
{ 
    $mensaje2="La copia de seguridad se ha restaurado correctamente.";  
    $cabecera2="COPIA DE SEGURIDAD RESTAURADA"; 
    echo $mensaje2; 
    echo "<meta http-equiv='Refresh' content='3;url=../index.html'>"; 
} 

unlink ("ficheroParaRestaurar.sql"); 

} 

?>