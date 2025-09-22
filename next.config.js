/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["localhost", "https://afrexim.tradersofafrica.com/"],
  },
};

module.exports = nextConfig;
