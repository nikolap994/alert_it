/** @type {import('next').NextConfig} */

require("./lib/cron");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
