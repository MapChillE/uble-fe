import "@workspace/ui/globals.css";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main style={{ paddingBottom: "72px" }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
