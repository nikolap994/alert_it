const cron = require("node-cron");
const database = require("../../helper/database-backend");
const Monitor = require("../../models/monitor");
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
		this.scheduleThirtyMinutes();
		this.scheduleHour();
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every one minute.
	 */
	scheduleOneMinute() {
		cron.schedule("* * * * *", async () => {
			await database();
			const monitors = await Monitor.find({ heartbeat: 1, enabled: 1 });
			this.executeJobs(monitors);
		});
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every five minutes.
	 */
	scheduleFiveMinutes() {
		cron.schedule("*/5 * * * *", async () => {
			await database();
			const monitors = await Monitor.find({ heartbeat: 5, enabled: 1 });
			this.executeJobs(monitors);
		});
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every ten minutes.
	 */
	scheduleTenMinutes() {
		cron.schedule("*/10 * * * *", async () => {
			await database();
			const monitors = await Monitor.find({ heartbeat: 10, enabled: 1 });
			this.executeJobs(monitors);
		});
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every thirty minutes.
	 */
	scheduleThirtyMinutes() {
		cron.schedule("*/30 * * * *", async () => {
			await database();
			const monitors = await Monitor.find({ heartbeat: 30, enabled: 1 });
			this.executeJobs(monitors);
		});
	}

	/**
	 * Function to execute all cronjobs that
	 * executes every hour.
	 */
	scheduleHour() {
		cron.schedule("0 * * * *", async () => {
			await database();
			const monitors = await Monitor.find({ heartbeat: 60, enabled: 1 });
			this.executeJobs(monitors);
		});
	}

	/**
	 * Execute all cronjobs in single function.
	 * @param {String} jobs - List of jobs from the database.
	 */
	async executeJobs(jobs) {
		const SITE_URI = process.env.SITE_URI;

		for (const job of jobs) {
			const siteUrl = job.url;
			const sitePort = job.port;
			const acceptedStatusCodes = job.acceptedStatusCodes;
			const monitorType = job.monitorType;
			const id = job._id;

			let options = {};

			if ("https" === monitorType) {
				options = {
					method: "GET",
					url: `${SITE_URI}/api/monitor/https?url=${siteUrl}`,
					headers: {},
				};
			}

			if ("tcp" === monitorType) {
				options = {
					method: "GET",
					url: `${SITE_URI}/api/monitor/tcp?url=${siteUrl}&port=${sitePort}`,
					headers: {},
				};
			}

			request(options, function (error, response) {
				if (error) throw new Error(error);

				if ("https" === monitorType) {
					const codes = acceptedStatusCodes.split("-");

					if (
						JSON.parse(response.body).status >= codes[0] &&
						JSON.parse(response.body).status <= codes[1]
					) {
						Monitor.findByIdAndUpdate(id, {
							upCheckStatus: true,
							message:
								"Response status code: " + JSON.parse(response.body).status,
						}).then(() => {});
					} else {
						Monitor.findByIdAndUpdate(id, {
							upCheckStatus: false,
							message:
								"Response status code: " + JSON.parse(response.body).status,
						}).then(() => {});
					}
				}

				if ("tcp" === monitorType) {
					if (JSON.parse(response.body).reachable) {
						Monitor.findByIdAndUpdate(id, {
							upCheckStatus: true,
							message: "Monitor is reachable",
						}).then(() => {});
					} else {
						Monitor.findByIdAndUpdate(id, {
							upCheckStatus: false,
							message: "Monitor is not reachable",
						}).then(() => {});
					}
				}
			});

			await Monitor.findByIdAndUpdate(id, { lastCheck: new Date() });
		}
	}
}

module.exports = Cron;
