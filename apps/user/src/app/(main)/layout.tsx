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
      <div className="bg-gray-100">
        <div className="mx-auto max-w-[1080px] bg-white">
          <Header />
          <ReactQueryProvider>
            <main className="pb-[55px]">{children}</main>
          </ReactQueryProvider>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
