/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable Turbopack which has compatibility issues with Node v22
    turbopack: false,
    // Use the legacy webpack-based bundler instead
    webpack: true,
  },
};

export default nextConfig;
