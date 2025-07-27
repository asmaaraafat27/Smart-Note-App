export const template = (code, name)=>
`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            background-color:rgb(40, 74, 167);
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 18px;
            margin-top: 20px;
        }
        .button:hover {
            background-color:rgb(1, 13, 3);
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Hello, ${name}!</h2> <!-- Placeholder for user name -->
    <p>Thank you for signing up with us! To get started, please activate your account by using the OTP below.</p>
    <h2 class="activation-button">${code}</h2>
    <p>If you did not sign up, please ignore this email.</p>
    <div class="footer">
        &copy; 2025 Smart Note App. All rights reserved.
    </div>
</div>

</body>
</html>
`;


export const forgetPasswordTemplate = (otp, userName) =>
    `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Forgot Password</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin:0; padding:0; color:#333; }
          .container { max-width:600px; background:#fff; margin:40px auto; padding:20px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);}
          .header { font-size:24px; font-weight:bold; color:#007BFF; margin-bottom:20px; text-align:center;}
          .content { font-size:16px; line-height:1.5;}
          .otp { font-size:28px; font-weight:bold; color:#FF5722; text-align:center; margin:20px 0; letter-spacing:4px;}
          .footer { font-size:14px; color:#888; margin-top:30px; text-align:center;}
          .button { display:inline-block; background:#007BFF; color:#fff; padding:12px 25px; margin:20px 0; text-decoration:none; border-radius:5px; font-weight:bold; text-align:center;}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Password Reset Request</div>
          <div class="content">
            <p>Hi <strong>${userName}</strong>,</p>
            <p>We received a request to reset your password. Use the OTP below to verify your identity and reset your password. This OTP is valid for the next 10 minutes.</p>
            <div class="otp">${otp}</div>
            <p>If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
            <p>Thank you,<br />The Support Team</p>
          </div>
          <div class="footer">
            &copy; 2025 Your Company. All rights reserved.
          </div>
        </div>
      </body>
      </html>
`;
  