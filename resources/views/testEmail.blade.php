<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <h1>Hello, {{ $recipientName }}!</h1>
    <p>Please click the button below to verify your email address:</p>
    <a href="{{ $verificationLink }}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none;">Verify Email</a>
    <p>If you did not create an account, no further action is required.</p>
    <p>Thanks,<br>{{ config('app.name') }}</p>
</body>
</html>
