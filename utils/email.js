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
      html: `<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif"><table cellpadding="0"cellspacing="0"style="background:#f4f4f4;padding:20px"width="100%"><tr><td align="center"><table cellpadding="0"cellspacing="0"style="background:#fff;border-radius:10px;overflow:hidden"width="600"><tr><td style="background:#4f46e5;color:#fff;text-align:center;padding:25px"><h2 style="margin:0">Welcome to Our Service</h2><tr><td style="padding:20px;color:#333"><h3>Hi Dear User 👋</h3><p>Thank you for joining us! We are happy to have you here. You will get updates, offers, and important news from us.<p>Explore our platform and enjoy your experience.<p style="text-align:center;margin-top:20px"><a href="http://localhost/5173/verifyemail/${token}"style="background:#4f46e5;color:#fff;padding:12px 20px;text-decoration:none;border-radius:5px;display:inline-block">Verify Email</a><tr><td style="background:#f9f9f9;text-align:center;padding:15px;font-size:12px;color:#777">© 2026 Your Company. All rights reserved.</table></table>
            `,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
  }

  module.exports = {mailVerifycation}