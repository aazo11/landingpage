<?php

require_once 'vendor/autoload.php';

$msg_box = array(); // form messages
$errors = array(); // error container

//bot checker
function is_not_bot() {
  if ($_POST['key'] == '') {
    return false;
  }
  else {
    $loadPage = $_POST['key'];
    $submit = time();
    if (($loadPage > $submit) && ($submit - $loadPage < 3) && ($submit - $loadPage > 86400)) {
      return false;
    }
    else {
      return true;
    }
  }
}

// check the fields
if($_POST['email'] == '') {
  $errors['email'] = 'Email field is required';
}
else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = "The email address is incorrect";
}

if(empty($errors) && is_not_bot()) {
  // collect data from the form
  $message = 'Email: ' . $_POST['email'];

  send_mail($message); // send a mail
  // success error
  $msg_box = array('success' => 'Thank you. Your info has been successfully sent');
}
else {
  // post errors
  $msg_box = $errors;
}

// response JSON
echo json_encode(array(
  'result' => $msg_box
));

// email sending function
function send_mail($message) {

  // Create the Transport
  $transport = (new Swift_SmtpTransport('smtp.postmarkapp.com', 587, 'tls'))
    ->setUsername('2ee3871f-9e1a-442d-a1e5-2a824250104e')
    ->setPassword('2ee3871f-9e1a-442d-a1e5-2a824250104e')
  ;

  // Create the Mailer using your created Transport
  $mailer = new Swift_Mailer($transport);

  // Create a message
  $settings = (new Swift_Message('ReconnectingLabs'))
    ->setFrom(['website@hi-george.com' => 'ReconnectingLabs ORG'])
    ->setTo(['hello@reconnectinglabs.com'])
    ->setBody($message)
    ->setContentType("text/html")
  ;

  // Send the message
  $result = $mailer->send($settings);
}
