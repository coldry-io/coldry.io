import './src/lib/env/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dribbble.com', 'lh3.googleusercontent.com']
  },
  output: 'standalone'
};

export default nextConfig;
