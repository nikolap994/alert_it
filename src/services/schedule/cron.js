const cron = require("node-cron");
const database = require("../../helper/database");
const Job = require("../../models/Job");
const request = require("request");

/**
 * Cron scheduler class.
 * This class will handle all dynamic background
 * scheduling with mongo calls depending on
 * cron format and status.
 */
class Cron {
	constructor() {
		this.scheduleOneMinute();
		this.scheduleFiveMinutes();
		this.scheduleTenMinutes();
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every one minute.
	 */
	scheduleOneMinute() {
		cron.schedule("* * * * *", async () => {
			await database();
			const jobs = await Job.find({ cron: "* * * * *", enabled: 1 });
			this.executeJobs(jobs);
		});
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every five minutes.
	 */
	scheduleFiveMinutes() {
		cron.schedule("*/5 * * * *", async () => {
			await database();
			const jobs = await Job.find({ cron: "*/5 * * * *", enabled: 1 });
			this.executeJobs(jobs);
		});
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every ten minutes.
	 */
	scheduleTenMinutes() {
		cron.schedule("*/10 * * * *", async () => {
			await database();
			const jobs = await Job.find({ cron: "*/10 * * * *", enabled: 1 });
			this.executeJobs(jobs);
		});
	}

	/**
	 * Execute all cronjobs in single function.
	 * @param {String} jobs - List of jobs from the database.
	 */
	executeJobs(jobs) {
		for (const job of jobs) {
			const commands = job.commands;
			const siteUrl = job.url;
			const sitePort = job.port;
			const commandsArray = commands.split(",");

			for (const command of commandsArray) {
				const SITE_URI = process.env.SITE_URI;
				let options = {};

				if ("https" === command) {
					options = {
						method: "GET",
						url: `${SITE_URI}/api/monitor/https?url=${siteUrl}`,
						headers: {},
					};
				}

				if ("web-scalper" === command) {
					options = {
						method: "POST",
						url: `${SITE_URI}/api/web-scalper`,
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							url: `${siteUrl}`,
							commands: [
								{
									type: "click",
									element: ".gLFyf.gsfi",
								},
								{
									type: "type",
									element: ".gLFyf.gsfi",
									value: "Test type...",
								},
								{
									type: "waitForSelector",
									element: ".gLFyf.gsfi",
								},
							],
						}),
					};
				}

				if ("ping" === command) {
					options = {
						method: "GET",
						url: `${SITE_URI}/api/monitor/ping?url=${siteUrl}`,
						headers: {},
					};
				}

				if ("tcp" === command) {
					options = {
						method: "GET",
						url: `${SITE_URI}/api/monitor/tcp?url=${siteUrl}&port=${sitePort}`,
						headers: {},
					};
				}

				request(options, function (error, response) {
					if (error) throw new Error(error);
					console.log(response.body);
				});
			}
		}
	}
}

module.exports = Cron;
