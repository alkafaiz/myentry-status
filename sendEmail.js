const nodemailer = require("nodemailer");

exports.sendEmail = async () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MYEMAIL,
      pass: process.env.MYPW
    }
  });

  let info = await transporter.sendMail({
    from: '"MyEntry-WATCH" <foo@example.com>',
    to: "alkafaiz99@gmail.com",
    subject: "MyEntry Status Update",
    text:
      "There has been a development in your MyEntry Application status, go check now!",
    html:
      "<b>There has been a development in your MyEntry Application status, go check now!</b>"
  });

  console.log("Message sent: %s", info.messageId);
};
