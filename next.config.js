/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
};

module.exports = nextConfig;

/*
const MillionLint = require('@million/lint');
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three']
};
module.exports = MillionLint.next()(nextConfig);
*/