/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'dist',
    swcMinify: true,
    output: 'export',
    env: {
        apiUrl: process.env.BASE_URL,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    // images: {
    //     domains: ['res.cloudinary.com'],
    // },
    images: { unoptimized: true }, 
};

module.exports = nextConfig;
