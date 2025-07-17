"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EntireSection from "./EntireSection";

const queryClient = new QueryClient();

const EntireSectionProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EntireSection />
    </QueryClientProvider>
  );
};

export default EntireSectionProvider;