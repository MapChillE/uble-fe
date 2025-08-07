import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import Script from "next/script";
import type { Viewport } from "next";
import PreventMobileZoom from "./PreventMobileZoom";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="manifest.json" />
        <meta name="color-scheme" content="light" />
        <title>Uble</title>
        <link rel="icon" href="/icons/favicon.ico" sizes="32x32" />
        <Script id="hotjar-init" strategy="afterInteractive">
          {`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6477133,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
        </Script>
      </head>
      <body className="h-screen">
        <Providers>
          <ServiceWorkerRegister />
          <PreventMobileZoom />
          <Toaster richColors position="top-center" />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
