require("dotenv").config();

const { getStatus } = require("./getStatus");
const { sendEmail } = require("./sendEmail");

exports.main = async (req, res) => {
  const response = await getStatus();

  if (response.success && !response.isUpdated) {
    const emailSentId = await sendEmail();
    const message = `email sent id: ${emailSentId}`;
    res.status(200).send(message);
  }
};
