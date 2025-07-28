import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body>
        <Providers>
          <Toaster richColors position="top-center" />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
