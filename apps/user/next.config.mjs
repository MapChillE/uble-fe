import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

// 1) PWA 전용 옵션만 먼저 전달
const pwaOptions = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd, // 개발환경에선 비활성화
  // 필요시 runtimeCaching 도 같이 넣을 수 있습니다.
  // runtimeCaching: require('next-pwa/cache'),
  buildExcludes: [
    /app-build-manifest\.json$/,
    /middleware-build-manifest\.json$/,
    /react-loadable-manifest\.json$/,
    /_buildManifest\.js$/,
    /_ssgManifest\.js$/,
    /_middleware\.js$/,
  ],
};

// 2) Next.js 전용 설정
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

// 3) PWA 래퍼에 Next.js 설정을 넘겨줍니다.
export default withPWA(pwaOptions)(nextConfig);
