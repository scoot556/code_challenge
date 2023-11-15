/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-ap-southeast-2.amazonaws.com',
                port: '',
                pathname: '/racevic.static/**',
            },
            {
                protocol: 'https',
                hostname: 's3-ap-southeast-2.amazonaws.com',
                port: '',
                pathname: '/racevic.silks/**',
            }
        ]
    },
}

module.exports = nextConfig