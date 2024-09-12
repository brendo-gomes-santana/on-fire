/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns : [
          {
              protocol: "http",
              hostname: "localhost"
          },
          {
            protocol: "https",
            hostname: "on-fire-production.up.railway.app"
        }
      ]
  }
};

export default nextConfig;