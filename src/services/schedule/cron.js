const cron = require("node-cron");
const database = require("../../helper/database");
const Job = require("../../models/Job");

// Execute every 1 minute
// Execute every 5 minutes
// Execute every 10 minutes
// Execute every 30 minutes
// Execute every 60 minutes

cron.schedule("* * * * *", async () => {
  await database();
  const job = await Job.find();
  console.log(job);
});
