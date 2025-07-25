import SearchSection from "@/app/(main)/home/components/SearchSection";
import SearchResults from "@/app/(main)/home/components/SearchResults";
import HomeContent from "@/app/(main)/home/components/HomeContent";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Suspense>
      <section>
        <div className="sticky top-12 z-10 bg-white">
          <SearchSection />
          <SearchResults />
        </div>
        <HomeContent />
      </section>
    </Suspense>
  );
};

export default HomePage;
