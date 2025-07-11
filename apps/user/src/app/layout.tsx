import "../../../../packages/ui/src/styles/globals.css";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
      <Footer />
    </>
  );
}
