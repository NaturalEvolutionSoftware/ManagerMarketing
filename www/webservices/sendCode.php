<?php

require 'conexion.php';
require_once('../phpmailer/PHPMailerAutoload.php');
    
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$userId= $request->userId;
@$email= $request->mail;
$random = generateRandomString(6);

$Query = "INSERT INTO recover VALUES (NULL, 
'$userId', 
'$random'
)";

$result = mysql_query($Query) or die(mysql_error());
if ($result) {
	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->SMTPSecure = 'tls';
	$mail->SMTPDebug = 0;
	$mail->Debugoutput = 'html';
	$mail->Host = "smtp.gmail.com";
	$mail->Port = 587;
	$mail->SMTPAuth = true;
	$mail->Username = "mmarketingggs@gmail.com";
	$mail->Password = "mmarketing2016";
	$mail->setFrom('mmarketingggs@gmail.com', 'Manager Marketing GGS');
	$mail->addAddress($email, 'Usuario de MMGGS');
	$mail->Subject = 'PHPMailer SMTP test';
	$mail->msgHTML("Hola que tal, este es tu código de recuperación de contraseña: " . $random);
	$mail->AltBody = 'This is a plain-text message body';
	
	if (!$mail->send()) {
		print json_encode(json_decode('{"status": false}'));
	} else {
		print json_encode(json_decode('{"status": true}'));
	}
} else {
   print json_encode(json_decode('{"status": false}'));
}

mysql_close($dbhandle);

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>