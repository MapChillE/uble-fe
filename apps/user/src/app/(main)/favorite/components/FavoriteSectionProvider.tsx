"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoriteBrandSection from "./FavoriteBrandSection";

const queryClient = new QueryClient();

const FavoriteSectionProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteBrandSection />
    </QueryClientProvider>
  );
};

export default FavoriteSectionProvider;
