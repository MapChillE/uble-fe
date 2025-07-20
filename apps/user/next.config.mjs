/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uble-storage.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
