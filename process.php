<?php
//config
$sendto = 'info@liverpool-bars.co.uk';
$subject = "New Quote Request";

if ( ! empty( $_POST ) ) {
    //whitelist
    $name = $_POST['name'];
    $from = $_POST['email'];
    $message = $_POST['message'];
    $honeypot = $_POST['url'];

    //check honeypot
    if(!empty($honeypot)) {
        echo json_encode(array('status'=>0, 'message'=>'There was a problem.'));

        die();
    }
    //check for empty form values
    if(empty($name) || empty($from) || empty($message)) {
        echo json_encode(array('status'=>0, 'message'=>'Please fill in all fields'));

        die();
    }

    //check for valid email
    $from = filter_var($from, FILTER_VALIDATE_EMAIL);
    if(!$from) {
        echo json_encode(array('status'=>0, 'message'=>'Enter a valid email'));
        die();
    }

    //send email
    $headers = sprintf('From: %s', $from) . "\r\n";
    $headers .= sprintf('Reply-To: %s', $from) . "\r\n";
    $headers .= sprintf('X-Mailer: PHP/%s', phpversion());

    if(mail($sendto, $subject, $message, $headers) ) {
        echo json_encode(array('status'=>1, 'message'=>'Thanks for submitting an email. We will be in touch shortly.'));
        die();
    }
    //return negative message if failed
    echo json_encode(array('status'=>0, 'message'=>'Email NOT sent successfully. Please try again.'));
}