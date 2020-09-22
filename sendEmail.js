const nodemailer = require("nodemailer");

exports.sendEmail = async () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MYEMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN
    }
  });

  let info = await transporter.sendMail({
    from: '"MyEntry-WATCH" <foo@example.com>',
    to: "faiz.bro99@gmail.com",
    subject: "MyEntry Status Update",
    text:
      "There has been a development in your MyEntry Application status, go check now!",
    html:
      "<b>There has been a development in your MyEntry Application status, go check now!</b><br/><em>computer generated notification developed by <span><a href='mailto:alkafaiz99@gmail.com'>alkafaiz</a></span>.<em/>"
  });

  console.log("Message sent: %s", info.messageId);
};
