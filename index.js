require("dotenv").config();

const { getStatus } = require("./getStatus");
const { sendEmail } = require("./sendEmail");

exports.main = async (req, res) => {
  const response = await getStatus();

  if (response.success && response.isUpdated) {
    const emailSentId = await sendEmail(response.html);
    const message = `email sent id: ${emailSentId}`;
    res.status(200).send(message);
  } else if (response.success && !response.isUpdated) {
    res.status(200).send("no updates");
  } else {
    res.status(200).send("an error has been occured. check CGP logs.");
  }
};
