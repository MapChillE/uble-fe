import "../../../../packages/ui/src/styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <html lang="en">
        <body>{children}</body>
      </html>
      <Footer />
    </>
  );
}
