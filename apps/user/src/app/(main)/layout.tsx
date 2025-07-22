import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

import HydrateData from "@/components/HydrateData";
import { Fragment } from "react";
import { ReactQueryProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <HydrateData />
      <Header />
      <ReactQueryProvider>
        <main style={{ paddingBottom: "72px" }}>{children}</main>
      </ReactQueryProvider>
      <Footer />
    </Fragment>
  );
}
