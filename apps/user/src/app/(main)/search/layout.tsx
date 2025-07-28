export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        height: "calc(100vh - 60px - 72px)",
        overflow: "hidden",
      }}
    >
      {children}
    </main>
  );
}
