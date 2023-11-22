/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    env: {
        apiUrl: process.env.BASE_URL,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: false,
    },
    // images: {
    //     domains: ['res.cloudinary.com'],
    // },
    images: { unoptimized: true }, 
};

module.exports = nextConfig;
