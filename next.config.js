/** @type {import('next').NextConfig} */

/**
 * On server startup run cronjob scheduler.
 */
require("./src/services/schedule/cron");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
