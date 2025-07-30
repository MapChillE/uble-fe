import { Providers } from "@/components/providers";
import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ClientLayout>{children}</ClientLayout>
    </Providers>
  );
}
