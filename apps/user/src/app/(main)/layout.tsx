import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

import HydrateData from "@/components/HydrateData";
import { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <HydrateData />
      <Header />
      <main style={{ paddingBottom: "72px" }}>{children}</main>
      <Footer />
    </Fragment>
  );
}
