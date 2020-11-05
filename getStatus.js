const axios = require("axios");
const FormData = require("form-data");
const https = require("https");

function isDifferent(newUpdate) {
  const re = /(?:^|\W)IN PROGRESS(?:$|\W)/;
  const isProgress = re.test(newUpdate);
  return !isProgress;
}

const REF_NUMBER = "[ YOUR REF_CODE NUMBER ]";

exports.getStatus = async () => {
  const data = new FormData();
  data.append("ref_no", REF_NUMBER);

  // creating agent to ignore SSL error
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const config = {
    method: "post",
    url: "https://myentry.myxpats.com.my/app/app/submit_check_status",
    headers: {
      Cookie: "sess_myentry=ro1hf5hu637c6193dojosdjv9m9paf3u",
      ...data.getHeaders()
    },
    data: data,
    httpsAgent: agent
  };

  const response = await axios(config)
    .then(function(response) {
      const recentStatus = JSON.stringify(response.data);
      const isUpdated = isDifferent(recentStatus);

      if (isUpdated) console.log("There's been an update on the status");
      else console.log("No status update");

      return { success: true, isUpdated, html: response.data };
    })
    .catch(function(error) {
      console.log(error);
      return { success: false };
    });

  return response;
};
