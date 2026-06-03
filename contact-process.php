<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Sanitize input fields
    $firstname = filter_var(trim($_POST['firstname']), FILTER_SANITIZE_STRING);
    $lastname  = filter_var(trim($_POST['lastname']), FILTER_SANITIZE_STRING);
    $email     = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone     = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
    $message   = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // 2. Simple Validation
    if (empty($firstname) || empty($lastname) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Redirect back to contact page with an error if validation fails
        header("Location: contact.html?status=error");
        exit;
    }

    // 3. Email Settings
    $to = "info@aethonmaritimes.com";
    $subject = "New Inquiry from Aethon Maritimes Contact Form";
    
    // 4. Construct HTML Email Body
    $email_content = "
    <html>
    <head>
        <title>New Website Inquiry</title>
    </head>
    <body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
        <div style='max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; padding: 20px; border-radius: 8px;'>
            <h2 style='color: #0c213a; border-bottom: 2px solid #0c213a; padding-bottom: 10px;'>Contact Form Submission</h2>
            <p><strong>Name:</strong> {$firstname} {$lastname}</p>
            <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p style='background-color: #f9f9f9; padding: 15px; border-left: 4px solid #7e848b; border-radius: 4px;'>
                <strong>Message:</strong><br>" . nl2br($message) . "
            </p>
            <span style='font-size: 11px; color: #999;'>This message was sent automatically from the Aethon Maritimes contact form portal.</span>
        </div>
    </body>
    </html>";

    // 5. Construct Email Headers
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: Aethon Web Portal <noreply@aethonmaritimes.com>" . "\r\n";
    $headers .= "Reply-To: {$firstname} {$lastname} <{$email}>" . "\r\n";

    // 6. Send Mail and Redirect
    if (mail($to, $subject, $email_content, $headers)) {
        header("Location: thank-you.html");
    } else {
        header("Location: contact.html?status=server-error");
    }
    exit;
} else {
    // Redirect direct browser lookups back to contact page
    header("Location: contact.html");
    exit;
}
?>