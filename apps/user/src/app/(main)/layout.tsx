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
      <div className="mx-auto max-w-[1080px]">
        <Header />
        <ReactQueryProvider>
          <main className="bg-gray-50 pb-[55px]">{children}</main>
        </ReactQueryProvider>
        <Footer />
      </div>
    </Fragment>
  );
}
