const cron = require("node-cron");
const request = require("request");

const SITE_URI = process.env.SITE_URI;

cron.schedule("* * * * *", () => {
  const checkerList = [
    "/api/monitor/https?url=https://google.com",
    // "/api/monitor/ping?url=google.com",
    "/api/monitor/tcp?url=google.com&port=80",
  ];
  checkerList.forEach(checker => {
    request(SITE_URI + checker, function (error, response) {
      if (!error) {
        console.log(response.body);
      } else {
        console.log(error);
      }
    });
  });
});
