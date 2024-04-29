/** @type {import('next').NextConfig} */
const API_URL = "http://localhost:6000"

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ]
  },
};

export default nextConfig;
