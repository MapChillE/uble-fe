import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="manifest.json" />
        <meta name="color-scheme" content="light" />
        <title>Uble</title>
        <link rel="icon" href="/icons/favicon.ico" sizes="32x32" />
      </head>
      <body>
        <Providers>
          <ServiceWorkerRegister />
          <Toaster richColors position="top-center" />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
