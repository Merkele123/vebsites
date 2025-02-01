<?php
$name = $_POST['name'];
$vsitor_email = $_POST['email'];
$subject = $_POST['subject'];
$massage = $_POST['massage'];

$email_form = 'info@yourwebsite.com';

$email_subject = 'New Form Submission';

$email_form ="User Name: $name.\n".
           "User Name: $visitor_email.\n".
           "User Name: $subject.\n".
           "User Name: $massage.\n";

$to ='mark.kosnki@hotmail.com';

$headers = "From: $email_from \r\n";

$header = "Reply-to : $visitor_email \r\n";


mail($to,$email_subject,$email-body,$headers);

header("Location: contact.html");   
?>