import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

import HydrateData from "@/components/HydrateData";
import { Fragment } from "react";
import { ReactQueryProvider } from "./providers";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <HydrateData />
      <ConfirmModal />
      <Header />
      <ReactQueryProvider>
        <main style={{ paddingBottom: "72px" }}>{children}</main>
      </ReactQueryProvider>
      <Footer />
    </Fragment>
  );
}
