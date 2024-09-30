const MillionLint = require('@million/lint');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three']
};
module.exports = MillionLint.next()(nextConfig);