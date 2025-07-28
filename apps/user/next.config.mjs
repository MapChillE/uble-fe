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
    // App Router 매니페스트
    /_next\/app-build-manifest\.json$/,
    /_next\/middleware-build-manifest\.json$/,
    // 페이지 라우터 매니페스트
    /_next\/react-loadable-manifest\.json$/,
    // Next 자체 빌드 매니페스트
    /_next\/_buildManifest\.js$/,
    // 필요시 더 추가…
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
  // ...그 외 Next.js 옵션
};

// 3) PWA 래퍼에 Next.js 설정을 넘겨줍니다.
export default withPWA(pwaOptions)(nextConfig);
