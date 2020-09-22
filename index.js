require("dotenv").config();

const { getStatus } = require("./getStatus");
const { sendEmail } = require("./sendEmail");

exports.main = async () => {
  const response = await getStatus();

  if (response.success && response.isUpdated) {
    await sendEmail();
  }
};
