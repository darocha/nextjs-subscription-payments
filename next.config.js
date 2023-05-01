/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ipfs.infura.io', 'lh3.googleusercontent.com']
  }
};

module.exports = nextConfig;
