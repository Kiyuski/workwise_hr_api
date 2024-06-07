<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leave Approval Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .message {
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 0.8em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Leave Approval Notification</h1>
        </div>
        <div class="message">
            <p>Dear {{ $data->owner_name }},</p>
            <p>I hope this email finds you well. I am writing to inform you that your leave application has been approved.</p>
            <p>Your leave for {{$data->leave_type}} has been confirmed from {{ $data->leave_start_date }} to {{ $data->leave_end_date }}, as per your request. During your absence, please ensure that all necessary arrangements are made to hand over your responsibilities to your designated colleague or team member.</p>
            <p>If you have any questions or concerns regarding your leave, feel free to reach out to me or the HR department for assistance.</p>
        </div>
        
        <div class="footer">
            <p>Best regards,<br>{{ $data->person_to_approved_name }}<br>{{ $data->person_to_approved_role }} / {{ $data->person_to_approved_position }}</p>
        </div>
    </div>
</body>
</html>
