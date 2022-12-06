/** @type {import('next').NextConfig} */

/**
 * On server startup run cronjob scheduler.
 */
// const Cron = require("./src/services/schedule/cron");
// new Cron();

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["www.gravatar.com"],
	},
};

module.exports = nextConfig;
