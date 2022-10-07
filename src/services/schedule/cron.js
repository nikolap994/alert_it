const cron = require("node-cron");
const database = require("../../helper/database");
const Monitor = require("../../models/monitor");

// Execute every 1 minute
// Execute every 5 minutes
// Execute every 10 minutes
// Execute every 30 minutes
// Execute every 60 minutes

cron.schedule("* * * * *", async () => {
  await database();
  const monitors = await Monitor.find();
  console.log(monitors);
});
