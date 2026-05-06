const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: "najmujshakib025@gmail.com",
      pass: "jcugbuonddciiupj",
    },
  });


  let mailVerifycation = async(email,token)=> {
      try {
    const info = await transporter.sendMail({
      from: "najmujshakib025@gmail.com", // sender address
      to: email, // list of recipients
      subject: "please veryfi your email", // subject line
      html: `<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif"><table cellpadding="0"cellspacing="0"style="background:#f4f4f4;padding:20px"width="100%"><tr><td align="center"><table cellpadding="0"cellspacing="0"style="background:#fff;border-radius:10px;overflow:hidden"width="600"><tr><td style="background:#4f46e5;color:#fff;text-align:center;padding:25px"><h2 style="margin:0">Welcome to Our Service</h2><tr><td style="padding:20px;color:#333"><h3>Hi Dear User 👋</h3><p>Thank you for joining us! We are happy to have you here. You will get updates, offers, and important news from us.<p>Explore our platform and enjoy your experience.<p style="text-align:center;margin-top:20px"><a href="http://localhost/5173/mailverifycation/${token}"style="background:#4f46e5;color:#fff;padding:12px 20px;text-decoration:none;border-radius:5px;display:inline-block">Verify Email</a><tr><td style="background:#f9f9f9;text-align:center;padding:15px;font-size:12px;color:#777">© 2026 Your Company. All rights reserved.</table></table>
            `,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
  }

   let resetPasswordEmail = async(email,token)=> {
      try {
    const info = await transporter.sendMail({
      from: "najmujshakib025@gmail.com", 
      to: email, 
      subject: "please reset your password", 
      html: `<table cellpadding="0"cellspacing="0"style="background:#fff;margin-top:40px;border-radius:10px;padding:40px"width="500"><tr><td align="center"><h1 style="color:#222">Reset Your Password</h1><tr><td><p style="font-size:16px;color:#555;line-height:28px">Hello,<p style="font-size:16px;color:#555;line-height:28px">We received a request to reset your password. Click the button below to create a new password.<tr><td align="center"style="padding:30px 0"><a href="http://localhost/5173/resetpassword/${token}"style="background:#2563eb;color:#fff;text-decoration:none;padding:14px 30px;border-radius:6px;display:inline-block;font-size:16px;font-weight:700">Reset Password</a><tr><td><p style="font-size:14px;color:#777;line-height:24px">If you did not request a password reset, you can safely ignore this email.<p style="font-size:14px;color:#777;line-height:24px">This link will expire in 10 minutes.<tr><td style="padding-top:30px"><hr style="border:none;border-top:1px solid #eee"><p style="font-size:13px;color:#999;text-align:center;margin-top:20px">© 2026 Your Company Name. All rights reserved.</table>
            `,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
  }

  module.exports = {mailVerifycation,resetPasswordEmail}