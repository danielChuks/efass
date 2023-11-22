/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    // output: 'export',
    env: {
        apiUrl: process.env.BASE_URL,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

module.exports = nextConfig;
