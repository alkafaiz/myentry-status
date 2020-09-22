const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const myOAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

exports.sendEmail = async () => {
  const myAccessToken = myOAuth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MYEMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: myAccessToken
    }
  });

  let info = await transporter.sendMail({
    from: '"MyEntry-WATCH" <alkafaiz99@gmail.com>',
    to: "faiz@checknow.org",
    subject: "MyEntry Status Update",
    text:
      "There has been a development in your MyEntry Application status, go check now!",
    html:
      "<em>* Testing *</em><br/><br/><b>There has been a development in your MyEntry Application status, go check now!</b><br/><em>computer generated notification developed by <span><a href='mailto:alkafaiz99@gmail.com'>alkafaiz</a></span>.<em/>"
  });

  console.log("Message sent: %s", info.messageId);
  return info.messageId;
};
