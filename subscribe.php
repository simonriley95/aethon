<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Extract and sanitize email submission
    $subscriber_email = filter_var(trim($_POST['newsletter_email'] ?? ''), FILTER_SANITIZE_EMAIL);

    // 2. Validate format structure
    if (filter_var($subscriber_email, FILTER_VALIDATE_EMAIL)) {
        
        $to = "info@aethonmaritimes.com";
        $subject = "New Newsletter Subscription Request";
        
        // Clean text layout for operations logging
        $message = "You have received a new newsletter subscription request via the website footer.\n\n";
        $message .= "Subscriber Email: " . $subscriber_email . "\n";
        $message .= "Submission Date: " . date("Y-m-d H:i:s") . "\n";

        // Setup clean transit headers
        $headers = "From: Aethon Web Desk <no-reply@aethonmaritimes.com>" . "\r\n";
        $headers .= "Reply-To: " . $subscriber_email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // 3. Dispatch email and route to your custom Thank You page
        if (mail($to, $subject, $message, $headers)) {
            header("Location: thank-you.html");
            exit();
        } else {
            // Fallback error fallback if server mail infrastructure hangs
            echo "<script>
                    alert('System error processing your subscription. Please email us directly at info@aethonmaritimes.com.');
                    window.history.back();
                  </script>";
        }
    } else {
        echo "<script>
                alert('Please enter a valid email address structure.');
                window.history.back();
              </script>";
    }
} else {
    // Lock direct URL access trajectories
    header("Location: index.html");
    exit();
}
?>