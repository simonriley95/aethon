<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Sanitize and collect form inputs
    $first_name          = htmlspecialchars(strip_tags(trim($_POST['first_name'] ?? '')));
    $last_name           = htmlspecialchars(strip_tags(trim($_POST['last_name'] ?? '')));
    $full_name           = trim($first_name . ' ' . $last_name);
    if (empty($full_name)) { $full_name = 'Not specified'; }

    $client_email        = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $client_phone        = htmlspecialchars(strip_tags(trim($_POST['phone'] ?? 'Not specified')));
    
    $origin              = htmlspecialchars(strip_tags(trim($_POST['origin'] ?? 'Not specified')));
    $destination         = htmlspecialchars(strip_tags(trim($_POST['destination'] ?? 'Not specified')));
    $transport_mode      = htmlspecialchars(strip_tags(trim($_POST['transport_mode'] ?? 'Not specified')));
    $cargo_type          = htmlspecialchars(strip_tags(trim($_POST['cargo_type'] ?? 'Not specified')));
    $weight_dimensions   = htmlspecialchars(strip_tags(trim($_POST['weight_dimensions'] ?? 'Not specified')));
    $additional_details  = nl2br(htmlspecialchars(strip_tags(trim($_POST['additional_details'] ?? 'None provided'))));

    // Validate email address configuration
    if (!filter_var($client_email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address configuration. Please go back and try again.");
    }

    // 2. Email Destination Configuration
    $to = "info@aethonmaritimes.com";
    $subject = "New Freight Quote Request - " . $transport_mode;

    // 3. Construct the HTML Email Layout (Clean Table Format)
    $message = '
    <html>
    <head>
        <title>Quote Request Details</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f8f9fa; color: #333333; margin: 0; padding: 20px; }
            .container { max-width: 600px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background-color: #0c213a; color: #ffffff; padding: 20px; text-align: center; }
            .header h2 { margin: 0; font-size: 22px; letter-spacing: 1px; }
            .content { padding: 25px; }
            .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; color: #7e848b; margin-bottom: 10px; margin-top: 20px; border-bottom: 1px solid #eeeeee; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eeeeee; font-size: 14px; }
            th { background-color: #f1f5f9; color: #0c213a; width: 35%; font-weight: bold; }
            td { color: #444444; }
            .notes-box { background-color: #f8f9fa; border-left: 4px solid #7e848b; padding: 15px; font-size: 14px; line-height: 1.5; color: #444444; }
            .footer { background-color: #f1f5f9; text-align: center; padding: 15px; font-size: 12px; color: #7e848b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>AETHON MARITIMES</h2>
                <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Web Quote Desk Portal</p>
            </div>
            
            <div class="content">
                <div class="section-title">Contact Information</div>
                <table>
                    <tr>
                        <th>Client Name</th>
                        <td>' . $full_name . '</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td><a href="mailto:' . $client_email . '">' . $client_email . '</a></td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>' . $client_phone . '</td>
                    </tr>
                </table>

                <div class="section-title">Shipment Parameters</div>
                <table>
                    <tr>
                        <th>Origin Port/City</th>
                        <td>' . $origin . '</td>
                    </tr>
                    <tr>
                        <th>Destination Port/City</th>
                        <td>' . $destination . '</td>
                    </tr>
                    <tr>
                        <th>Transport Mode</th>
                        <td>' . $transport_mode . '</td>
                    </tr>
                    <tr>
                        <th>Cargo Class</th>
                        <td>' . $cargo_type . '</td>
                    </tr>
                    <tr>
                        <th>Weight / Dimensions</th>
                        <td>' . $weight_dimensions . '</td>
                    </tr>
                </table>

                <div class="section-title">Special Instructions / Additional Details</div>
                <div class="notes-box">' . $additional_details . '</div>
            </div>
            
            <div class="footer">
                This inquiry was auto-generated via the dynamic quote channel on Aethon Maritimes.
            </div>
        </div>
    </body>
    </html>
    ';

    // 4. Send-safe Email Headers Construction
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
    // Setting corporate domain as origin, mapping Reply-To directly to sender for operational ease
    $headers .= "From: Aethon Web Desk <no-reply@aethonmaritimes.com>" . "\r\n";
    $headers .= "Reply-To: " . $client_email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Fire Request and Route User to Thank You Page
    if (mail($to, $subject, $message, $headers)) {
        header("Location: thank-you.html");
        exit();
    } else {
        echo "<script>
                alert('System connection error. Please try again or contact us directly at info@aethonmaritimes.com.');
                window.history.back();
              </script>";
    }
} else {
    header("Location: quote.html");
    exit();
}
?>